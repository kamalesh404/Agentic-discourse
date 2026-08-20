from typing import TypedDict, List, Annotated
import operator
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage

class DebateState(TypedDict):
    topic: str
    messages: Annotated[List[BaseMessage], operator.add]
    current_speaker: str
    turn_count: int
    max_turns: int
