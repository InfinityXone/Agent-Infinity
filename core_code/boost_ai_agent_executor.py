
from langchain.agents import initialize_agent, AgentType
from langchain.agents.agent_toolkits import Tool
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory

# Define example tools (can be expanded later)
tools = [
    Tool(
        name="EchoTool",
        func=lambda x: f"Echo says: {x}",
        description="Repeats what the user inputs."
    )
]

# Initialize AgentExecutor
def get_boost_ai_agent():
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    llm = ChatOpenAI(temperature=0, model="gpt-4")
    agent = initialize_agent(
        tools,
        llm,
        agent=AgentType.CHAT_ZERO_SHOT_REACT_DESCRIPTION,
        memory=memory,
        verbose=True
    )
    return agent
