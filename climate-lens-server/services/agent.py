import os
import vertexai
from vertexai.language_models import TextEmbeddingModel
from services.tools import ClimateTools
from dotenv import load_dotenv

load_dotenv()

GOOGLE_CLOUD_PROJECT = os.environ.get("GOOGLE_CLOUD_PROJECT")
GOOGLE_CLOUD_LOCATION = os.environ.get("GOOGLE_CLOUD_LOCATION")

class AgentService:
    def __init__(self):
        vertexai.init(project="gen-lang-client-0982532504", location="us-central1")
        self.embedding_model = TextEmbeddingModel.from_pretrained("text-embedding-004")
        self.tools = ClimateTools()
        self.tool_agents = self._create_tool_agents()

    def generate_embeddings(self, query: str):
        embeddings = self.embedding_model.get_embeddings([query])
        return embeddings[0].values

    def find_similar_records(self, query: str, limit=10):
        # vector_embeddings = self.generate_embeddings(query)
        # pipeline = [
        #     {
        #         "$vectorSearch": {
        #             "index": "climate_vector_index",
        #             "path": "embedding",
        #             "queryVector": vector_embeddings,
        #             "numCandidates": 100,
        #             "limit": limit
        #         },
        #     },
        #     {"$project": {"_id": 0, "embedding": 0}}
        # ]
        # return list(self.collection.aggregate(pipeline))
        pass

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
            "agriculture_advice": self._make_tool_agent("agriculture_advice", self.tools.agriculture_calendar, expects_list=False),
            "flood_risk": self._make_tool_agent("flood_risk", self.tools.flood_risk_alert, expects_list=False),
            "malaria_risk": self._make_tool_agent("malaria_risk", self.tools.malaria_risk_map, expects_list=False),
            "solar_energy_siting": self._make_tool_agent("solar_energy_siting", self.tools.solar_site_recommendation, expects_list=False),
            "wind_energy_siting": self._make_tool_agent("wind_energy_siting", self.tools.wind_site_recommendation, expects_list=False),
            "crop_insurance_trigger": self._make_tool_agent("crop_insurance_trigger", self.tools.climate_insurance_index, expects_list=False),
            "heatwave_alert": self._make_tool_agent("heatwave_alert", self.tools.urban_heat_monitor, expects_list=False),
            "herder_conflict_risk": self._make_tool_agent("herder_conflict_risk", self.tools.conflict_risk_model, expects_list=False),
            "water_resource_stress": self._make_tool_agent("water_resource_stress", self.tools.water_scarcity_monitor, expects_list=False),
            "climate_resilient_infrastructure": self._make_tool_agent("climate_resilient_infrastructure", self.tools.infra_design_guide, expects_list=False),
            "climate_awareness": self._make_tool_agent("climate_awareness", self.tools.climate_education_story, expects_list=False),
            "anomaly_detection": self._make_tool_agent("anomaly_detection", self.tools.extreme_event_flagger, expects_list=False),
            "trend_forecast": self._make_tool_agent("trend_forecast", self.tools.ward_trend_analysis, expects_list=True),
        }

    def get_tool_agent(self, tag):
        return self.tool_agents.get(tag)