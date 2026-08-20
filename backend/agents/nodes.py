import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from .state import DebateState

# In production, ensure GOOGLE_API_KEY is in .env
def get_llm():
    return ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.7)

def skeptic_node(state: DebateState):
    llm = get_llm()
    system_prompt = SystemMessage(
        content="You are The Skeptic. Your job is to critically analyze the topic and point out potential flaws, risks, and negative consequences. Be sharp, analytical, and uncompromising in your critique. Keep your responses concise (1-2 paragraphs)."
    )
    # We pass the history of the debate to the LLM
    messages = [system_prompt] + state["messages"]
    response = llm.invoke(messages)
    
    # Tag the message with the speaker's name
    tagged_response = AIMessage(content=f"**The Skeptic:** {response.content}")
    
    return {
        "messages": [tagged_response],
        "current_speaker": "skeptic",
        "turn_count": state["turn_count"] + 1
    }

def optimist_node(state: DebateState):
    llm = get_llm()
    system_prompt = SystemMessage(
        content="You are The Optimist. Your job is to see the potential in the topic, defend it against the Skeptic's critiques, and highlight the positive outcomes and innovations. Be visionary and encouraging. Keep your responses concise (1-2 paragraphs)."
    )
    messages = [system_prompt] + state["messages"]
    response = llm.invoke(messages)
    
    tagged_response = AIMessage(content=f"**The Optimist:** {response.content}")
    
    return {
        "messages": [tagged_response],
        "current_speaker": "optimist",
        "turn_count": state["turn_count"] + 1
    }

def judge_node(state: DebateState):
    llm = get_llm()
    system_prompt = SystemMessage(
        content="You are The Judge. The debate is concluding. Review the arguments made by The Skeptic and The Optimist. Provide a balanced, objective final verdict that synthesizes both viewpoints. Keep it concise."
    )
    messages = [system_prompt] + state["messages"]
    response = llm.invoke(messages)
    
    tagged_response = AIMessage(content=f"**The Judge:** {response.content}")
    
    return {
        "messages": [tagged_response],
        "current_speaker": "judge",
        "turn_count": state["turn_count"] + 1
    }
