import os
import asyncio
import vertexai
import google.generativeai as genai
from collections import defaultdict
from typing import Any, Dict, List, Optional
from vertexai.language_models import TextEmbeddingModel
from vertexai.preview.generative_models import GenerativeModel
from dotenv import load_dotenv
from config.mongodb import MongoDBClient
from google.adk.agents import Agent

load_dotenv()

GOOGLE_CLOUD_PROJECT = os.environ.get("GOOGLE_CLOUD_PROJECT")
GOOGLE_CLOUD_LOCATION = os.environ.get("GOOGLE_CLOUD_LOCATION")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")


# ✅ Define tools
def escalate_emergency_case(record: Dict[str, Any]) -> str:
    return f"🚨 Emergency escalation triggered based on: {record.get('interpretation', '')}"

def recommend_followup_tests(record: Dict[str, Any]) -> List[str]:
    return ["CBC", "MRI", "Liver Function Test"]  # or dynamic logic

def provide_patient_education(record: Dict[str, Any]) -> str:
    return f"🧠 Patient Education: {record.get('interpretation', '')} suggests no immediate danger. Monitor symptoms."



class AgentService:
    def __init__(self):
        vertexai.init(project=GOOGLE_CLOUD_PROJECT, location=GOOGLE_CLOUD_LOCATION)
        genai.configure(api_key=GEMINI_API_KEY)
        self.embedding_model = TextEmbeddingModel.from_pretrained("text-embedding-004")
        self.model_name = "gemini-1.5-pro"

    async def generate_embeddings(self, query: str):
        embeddings = await asyncio.to_thread(self.embedding_model.get_embeddings, [query])
        return embeddings[0].values

    async def find_similar_records(self, query: str, limit=10):
        db = MongoDBClient.get_database()
        vector_embeddings = await self.generate_embeddings(query)
        pipeline = [
            {
                "$vectorSearch": {
                    "index": "climate_vector_index",
                    "path": "embeddings",
                    "queryVector": vector_embeddings,
                    "numCandidates": 100,
                    "limit": limit
                },
            },
            {
                "$project": {
                    "_id": 0,
                    "embeddings": 0,
                }
            }
        ]
        cursor = db["health_record"].aggregate(pipeline)
        results = []
        async for doc in cursor:
            results.append(doc)
        return results

    async def analyze_medical_records(self, records: List[Dict[str, Any]]) -> str:
        """Expert system to analyze medical records using Gemini tools."""

        formatted_records = ""
        for i, record in enumerate(records, 1):
            interp = record.get("interpretation", "No interpretation provided.")
            tags = record.get("functional_tags", "None")
            formatted_records += (
                f"---\n"
                f"### Record {i}\n"
                f"**Tags**: {tags}\n"
                f"**Interpretation**: {interp}\n"
            )
        
        prompt_template = f"""
            You are a highly knowledgeable and precise medical AI assistant trained in evidence-based practice.

            Below are {len(records)} patient medical records. Each record includes:
            - An interpretation of a medical event, typically described by a clinician.
            - A set of functional tags indicating relevant medical domains.

            Your task is to analyze each record and provide:
            1. **Clinical Concern**: A summary of the medical issue described.
            2. **Expert Analysis**: A clear and accurate clinical interpretation using your medical expertise.
            3. **Suggested Action**: Recommended follow-up steps, clarifications, or additional diagnostics.

            Return your analysis in the following structured format:

            ---
            ### Record {len(records)}  
            **Tags**: [functional_tags] 
            **Concern**: *[your clinical concern here]*  
            **Analysis**: *[your clinical reasoning and explanation]*  
            **Suggested Action**: *[your recommendation or follow-up]*  
            ---

            Return your analysis in the following markdown code block format, sound natural with proper indentation and spacing, so that it can be directly rendered inside a React <pre> component:

            Here are the records:
            {formatted_records}
            """

        system_instruction = (
            "You are a helpful and concise medical reasoning agent with deep knowledge of diagnostic and therapeutic recommendations."
        )

        model = GenerativeModel("gemini-2.0-flash")  
        response = model.generate_content(
            [system_instruction, prompt_template]
        )

        return response.text


    async def generate_all_embeddings(self):
        db = MongoDBClient.get_database()
        collection = db["health_record"]
        cursor = collection.find({
            "$or": [
                {"embeddings": {"$exists": False}},
                {"embeddings": None}
            ]
        })
        docs = await cursor.to_list(length=None)

        for doc in docs:
            interpretation_text = doc.get("interpretation", "")
            embedding = await self.generate_embeddings(interpretation_text) if interpretation_text else None
            await collection.update_one(
                {"_id": doc["_id"]},
                {"$set": {"embeddings": embedding}}
            )
            print(f"Updated document {doc['_id']} with embeddings")
            await asyncio.sleep(72)
        return "Completed"
