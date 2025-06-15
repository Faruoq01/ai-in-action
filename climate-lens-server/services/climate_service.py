import os
import certifi
import pymongo
import vertexai
from typing import List, Dict
from vertexai.language_models import TextEmbeddingModel
from google.adk.agents import Agent
from models.climate import ClimateRecord, ToolResult
from schemas.climate import ClimateQuery
from fastapi import HTTPException

class ClimateService:
    def __init__(self, project_id: str, project_location: str, connection_string: str, database_name: str):
        self.project_id = project_id
        self.project_location = project_location
        self.connection_string = connection_string
        self.database_name = database_name
        self.client = pymongo.MongoClient(connection_string, tlsCAFile=certifi.where())
        vertexai.init(project=project_id, location=project_location)

    def generate_embeddings(self, query: str) -> List[float]:
        model = TextEmbeddingModel.from_pretrained("text-embedding-004")
        embeddings = model.get_embeddings([query])
        return embeddings[0].values

    def find_similar_records(self, query: str) -> List[Dict]:
        vector_embeddings = self.generate_embeddings(query)
        pipeline = [
            {
                "$vectorSearch": {
                    "index": "climate_vector_index",
                    "path": "embedding",
                    "queryVector": vector_embeddings,
                    "numCandidates": 100,
                    "limit": 10
                },
            },
            {"$project": {"_id": 0, "embedding": 0}}
        ]
        return list(self.client[self.database_name][self.collection_name].aggregate(pipeline))

    # Tool functions
    def agriculture_calendar(self, record: Dict) -> str:
        return "Advice: Consider planting drought-resistant crops due to moderate rainfall."

    def flood_risk_alert(self, record: Dict) -> str:
        return "Alert: Low flood risk; rainfall levels are below threshold."

    def malaria_risk_map(self, record: Dict) -> str:
        return "Risk: Moderate malaria risk due to high humidity and warm temperatures."

    def solar_site_recommendation(self, record: Dict) -> str:
        return "Recommendation: Moderate solar potential; consider panel orientation to maximize capture."

    def wind_site_recommendation(self, record: Dict) -> str:
        return "Recommendation: Adequate wind speeds for small-scale turbines."

    def climate_insurance_index(self, record: Dict) -> float:
        return 0.75

    def urban_heat_monitor(self, record: Dict) -> str:
        return "Warning: No heatwave detected."

    def conflict_risk_model(self, record: Dict) -> str:
        return "Risk: Low conflict risk."

    def water_scarcity_monitor(self, record: Dict) -> str:
        return "Status: Water resources adequate."

    def infra_design_guide(self, record: Dict) -> str:
        return "Guide: Use reinforced foundations for damp soils."

    def climate_education_story(self, record: Dict) -> str:
        return "Story: Coastal communities adapt to changing rainfall patterns."

    def ward_trend_analysis(self, record_list: List[Dict]) -> str:
        return "Trend: Increasing temperature trend over past 5 years."

    def extreme_event_flagger(self, record: Dict) -> str:
        return "Flag: No anomalies detected."

    def make_tool_agent(self, tag: str, tool_fn):
        return Agent(
            name=tag,
            model="gemini-2.0-flash",
            description=f"{tag} tool agent",
            instructions=f"Run the {tag} tool on the provided climate record.",
            tool=tool_fn
        )

    @property
    def tool_agent_map(self) -> Dict[str, Agent]:
        return {
            "agriculture_advice": self.make_tool_agent("agriculture_advice", self.agriculture_calendar),
            "flood_risk": self.make_tool_agent("flood_risk", self.flood_risk_alert),
            "malaria_risk": self.make_tool_agent("malaria_risk", self.malaria_risk_map),
            "solar_energy_siting": self.make_tool_agent("solar_energy_siting", self.solar_site_recommendation),
            "wind_energy_siting": self.make_tool_agent("wind_energy_siting", self.wind_site_recommendation),
            "crop_insurance_trigger": self.make_tool_agent("crop_insurance_trigger", self.climate_insurance_index),
            "heatwave_alert": self.make_tool_agent("heatwave_alert", self.urban_heat_monitor),
            "herder_conflict_risk": self.make_tool_agent("herder_conflict_risk", self.conflict_risk_model),
            "water_resource_stress": self.make_tool_agent("water_resource_stress", self.water_scarcity_monitor),
            "climate_resilient_infrastructure": self.make_tool_agent("climate_resilient_infrastructure", self.infra_design_guide),
            "climate_awareness": self.make_tool_agent("climate_awareness", self.climate_education_story),
            "anomaly_detection": self.make_tool_agent("anomaly_detection", self.extreme_event_flagger),
            "trend_forecast": self.make_tool_agent("trend_forecast", self.ward_trend_analysis),
        }

    def run_tools(self, query: ClimateQuery) -> Dict[str, str | float | Dict]:
        records = self.find_similar_records(query.query)
        if not records:
            raise HTTPException(status_code=404, detail="No matching climate records found.")

        record = records[0]  # Use the first match
        result = {}
        for tag in query.functional_tags:
            agent = self.tool_agent_map.get(tag)
            if agent:
                try:
                    result[tag] = agent.invoke(record)
                except Exception as e:
                    result[tag] = f"Error running {tag}: {str(e)}"
            else:
                result[tag] = "Unsupported tag."
        return result

# Singleton instance
climate_service = ClimateService(
    project_id=os.environ.get("GOOGLE_CLOUD_PROJECT"),
    project_location=os.environ.get("GOOGLE_CLOUD_LOCATION"),
    connection_string=os.environ.get("CONNECTION_STRING"),
    database_name=os.environ.get("DATABASE_NAME"),
)