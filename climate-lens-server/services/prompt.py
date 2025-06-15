from agent import AgentService

class PromptService:
    def __init__(self, agent_service: AgentService, tool_tag: str):
        self.agent_service = agent_service
        self.tool_agent = agent_service.get_tool_agent(tool_tag)
        if self.tool_agent is None:
            raise ValueError(f"Tool agent with tag '{tool_tag}' not found.")

    def run(self, query: str):
        matches = self.agent_service.find_similar_records(query)
        if not matches:
            return {"error": "No similar records found."}

        # Use top matching record
        top_record = matches[0]

        # Invoke tool agent on top record
        result = self.tool_agent.invoke(top_record)
        return result
