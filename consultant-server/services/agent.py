import asyncio
import os
import vertexai
from vertexai.language_models import TextEmbeddingModel
from services.tools import MedicalTools
from dotenv import load_dotenv
from config.mongodb import MongoDBClient

load_dotenv()

GOOGLE_CLOUD_PROJECT = os.environ.get("GOOGLE_CLOUD_PROJECT")
GOOGLE_CLOUD_LOCATION = os.environ.get("GOOGLE_CLOUD_LOCATION") 

class AgentService:
    def __init__(self):
        vertexai.init(project="gen-lang-client-0982532504", location="us-central1")
        self.embedding_model = TextEmbeddingModel.from_pretrained("text-embedding-004")
        self.tools = MedicalTools()
        self.tool_agents = self._create_tool_agents()

    # async def generate_embeddings(self, query: str):
    #     embeddings = self.embedding_model.get_embeddings([query])
    #     return embeddings[0].values 
    
    async def generate_embeddings(self, query: str):
        embeddings = await asyncio.to_thread(self.embedding_model.get_embeddings, [query])
        return embeddings[0].values
 
    async def find_similar_records(self, query: str, limit=10):
        db = MongoDBClient.get_database()
        vector_embeddings = await self.generate_embeddings(query)  # get 768-dim vector

        pipeline = [
            {
                "$search": {
                    "index": "climate_vector_index",
                    "knnBeta": {
                        "vector": vector_embeddings,
                        "path": "embeddings",
                        "k": limit
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "embeddings": 0
                }
            }
        ]

        cursor = db["health_record"].aggregate(pipeline)
        results = []
        async for doc in cursor:
            results.append(doc)
        return results

    def _make_tool_agent(self, tag, tool_fn, expects_list=False):
        class Agent:
            def __init__(self, name, tool, expects_list):
                self.name = name
                self.tool = tool
                self.expects_list = expects_list

            def invoke(self, records):
                if self.expects_list:
                    if not records:
                        return {"error": "No records found"}
                    return {"result": self.tool(records)}
                else:
                    if not records:
                        return {"error": "No records found"}
                    return {"result": self.tool(records[0])}

        return Agent(name=tag, tool=tool_fn, expects_list=expects_list)

    def _create_tool_agents(self):
        return {
            "cardiology": self._make_tool_agent("cardiology", self.tools.cardiology, expects_list=False),
            "neurology": self._make_tool_agent("neurology", self.tools.neurology, expects_list=False),
            "autoimmune": self._make_tool_agent("autoimmune", self.tools.autoimmune, expects_list=False),
            "pharmacology": self._make_tool_agent("pharmacology", self.tools.pharmacology, expects_list=False),
            "diagnostic_uncertainty": self._make_tool_agent("diagnostic_uncertainty", self.tools.diagnostic_uncertainty, expects_list=False),
            "patient_education": self._make_tool_agent("patient_education", self.tools.patient_education, expects_list=False),
        }

    def get_tool_agent(self, tag):
        return self.tool_agents.get(tag)
    
    
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
            if interpretation_text:
                embedding = await self.generate_embeddings(interpretation_text)
            else:
                embedding = None

            await collection.update_one(
                {"_id": doc["_id"]},
                {"$set": {"embeddings": embedding}}
            )

            print(f"Updated document {doc['_id']} with embeddings")

            # Wait ~72 seconds before next request (5 per 6 mins)
            await asyncio.sleep(72)
            print("hello im done")

        return "Completed"
