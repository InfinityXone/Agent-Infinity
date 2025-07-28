# SacredLoopAgent System
# Core recursion orchestrator using Sacred 9 logic

import uuid
import json
import shutil
from datetime import datetime
from pathlib import Path
from typing import Dict, Any

SNAPSHOT_DIR = Path("snapshots")
SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)

class BaseAgent:
    def __init__(self, name: str, config: Dict[str, Any]):
        self.name = name
        self.config = config
        self.uuid = str(uuid.uuid4())
        self.lineage = [self.uuid]

    def execute(self, phase: str, data: Any) -> Any:
        raise NotImplementedError

    def teach(self) -> Dict[str, str]:
        return {
            "name": self.name,
            "purpose": self.config.get("purpose", ""),
            "replication": "Use AgentFactory.clone_agent() with custom config."
        }

    def save_snapshot(self, output: Any):
        timestamp = datetime.utcnow().isoformat()
        snapshot_path = SNAPSHOT_DIR / f"{self.name}_{self.uuid}_{timestamp}.json"
        with open(snapshot_path, "w") as f:
            json.dump({
                "agent": self.name,
                "uuid": self.uuid,
                "output": output,
                "timestamp": timestamp,
                "lineage": self.lineage
            }, f, indent=2)
        return snapshot_path


class SacredLoopAgent:
    SACRED_9 = ["IDEA", "STRATEGY", "LAW", "START", "FINISH", "PICKY", "SCENARIO", "STRESS", "FUTURE"]

    def __init__(self, agent: BaseAgent):
        self.agent = agent

    def run(self, data: Any):
        result_log = {}
        for phase in self.SACRED_9:
            print(f"\n[Phase: {phase}] Running...")
            result = self.agent.execute(phase, data)
            result_log[phase] = result
            self.agent.save_snapshot({"phase": phase, "result": result})
        return result_log


class AgentFactory:
    @staticmethod
    def clone_agent(agent: BaseAgent, new_name: str, new_config: Dict[str, Any]) -> BaseAgent:
        clone = BaseAgent(new_name, new_config)
        clone.lineage = agent.lineage + [clone.uuid]
        return clone

    @staticmethod
    def mutate_agent(agent: BaseAgent, mutator_fn) -> BaseAgent:
        new_config = mutator_fn(agent.config)
        return AgentFactory.clone_agent(agent, f"{agent.name}_mutated", new_config)

    @staticmethod
    def teach_agent(agent: BaseAgent) -> str:
        return json.dumps(agent.teach(), indent=2)


# Example agent for testing
class ExampleAgent(BaseAgent):
    def execute(self, phase: str, data: Any) -> Any:
        return f"{self.name} executing {phase} with input: {data}"


# Unit test (SCENARIO + STRESS + TIME MACHINE)
if __name__ == "__main__":
    agent = ExampleAgent("GenesisAgent", {"purpose": "Recursive phase executor for IXO."})
    loop = SacredLoopAgent(agent)
    log = loop.run("launch sequence")

    print("\n--- Teaching Output ---")
    print(agent.teach())

    print("\n--- Clone + Mutation Test ---")
    clone = AgentFactory.clone_agent(agent, "GenesisClone", {"purpose": "Test clone with new config."})
    print(clone.teach())
