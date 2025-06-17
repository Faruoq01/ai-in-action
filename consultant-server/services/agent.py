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
        print(records, "records")
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
            You are a highly knowledgeable and precise medical AI assistant trained in evidence-based practice. Your task is to analyze a set of patient medical records and provide a clear, concise, and clinically accurate summary. Each record includes:
                A. Interpretation: A clinician's description of a medical event or condition.
                B. Functional Tags: Medical domains relevant to the record (e.g., neurology, diagnostic_uncertainty).
            
            
            Instructions

            1. Analyze All Records: Review the provided {len(records)} medical records to identify common themes, potential diagnoses, and patient concerns.

            2. Summarize Clearly: Provide a structured summary with the following sections:
                a. Clinical Concern: A concise summary of the primary medical issues across the records, highlighting shared symptoms or concerns.
                b. Expert Analysis: A precise clinical interpretation, linking symptoms to potential etiologies (e.g., musculoskeletal, neurological, systemic). Avoid vague or overly broad statements. Address diagnostic challenges and patient-specific factors (e.g., frustration, anxiety).
                c. Suggested Action: Specific, actionable recommendations for follow-up, diagnostics, or treatment. Prioritize patient-centered care, specialist referrals, and addressing diagnostic uncertainty.
                d. Tags: A consolidated list of relevant functional tags from the records, avoiding redundancy.

            3. Formatting: Use markdown with clear headers (##), bullet points for actionable items, and a professional tone. Ensure no redundant text or repeated sections.
            4. Quality Standards:
                a. Be clinically accurate and evidence-based.
                b. Avoid generalizations; tie analysis to specific symptoms or conditions in the records.
                c. Address patient concerns (e.g., frustration, anxiety) to ensure empathetic recommendations.
                d.Consolidate tags to reflect key medical domains without repetition.

            Output Format
                1. Medical Records Analysis

                2. Concern
                [Summary of the primary medical issues across the records, focusing on shared symptoms, conditions, or patient concerns.]

                3. Analysis
                [Clear, evidence-based interpretation of symptoms, potential diagnoses, and contributing factors. Highlight diagnostic challenges and patient-specific factors like anxiety or healthcare system issues.]

                4. Suggested Action
                - [Specific, actionable recommendation 1, e.g., diagnostic tests or imaging.]
                - [Specific, actionable recommendation 2, e.g., specialist referrals.]
                - [Additional recommendations as needed, prioritizing patient-centered care.]

                5. Tags
                [Consolidated list of functional tags, e.g., diagnostic_uncertainty, neurology, patient_education]

            Finally do not forget to format it to look beautiful in a presentation mode no characters no symbols and consistent font.   
            Here are the records:
            {formatted_records}
            """

        model = GenerativeModel("gemini-2.0-flash")  
        response = model.generate_content(
            [prompt_template]
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
