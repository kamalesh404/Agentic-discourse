from langgraph.graph import StateGraph, END
from .state import DebateState
from .nodes import skeptic_node, optimist_node, judge_node

def should_continue(state: DebateState):
    """
    Router function to determine who speaks next or if we should end.
    """
    turn_count = state.get("turn_count", 0)
    max_turns = state.get("max_turns", 3) # Skeptic -> Optimist -> Skeptic -> Optimist
    
    if turn_count >= max_turns:
        # Time for the judge to step in
        return "judge"
    
    current_speaker = state.get("current_speaker", "start")
    
    if current_speaker == "skeptic":
        return "optimist"
    elif current_speaker == "optimist" or current_speaker == "start":
        return "skeptic"
    else:
        return "judge"

def create_debate_graph():
    """
    Creates the LangGraph state machine for the debate.
    """
    workflow = StateGraph(DebateState)

    # Add the nodes (our agents)
    workflow.add_node("skeptic", skeptic_node)
    workflow.add_node("optimist", optimist_node)
    workflow.add_node("judge", judge_node)

    # Define the edges (how they talk to each other)
    # The debate starts with the Skeptic analyzing the topic
    workflow.set_entry_point("skeptic")

    # After the Skeptic speaks, we check if we should go to Optimist or Judge
    workflow.add_conditional_edges(
        "skeptic",
        should_continue,
        {
            "optimist": "optimist",
            "judge": "judge"
        }
    )

    # After the Optimist speaks, we check if we should go back to Skeptic or Judge
    workflow.add_conditional_edges(
        "optimist",
        should_continue,
        {
            "skeptic": "skeptic",
            "judge": "judge"
        }
    )

    # After the Judge speaks, the debate ends
    workflow.add_edge("judge", END)

    # Compile the graph
    app = workflow.compile()
    
    return app
