from app.decision_record_repository import (
    DecisionRecordRepository,
)
from app.intelligence.edge_engine import (
    EdgeDiscoveryEngine,
)


repository = DecisionRecordRepository()
engine = EdgeDiscoveryEngine()

records = repository.get_observed()

engine.learn(records)

print("EDGE DISCOVERY")
print(engine.discover())