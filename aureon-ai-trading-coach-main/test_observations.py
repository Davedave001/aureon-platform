from app.intelligence.observations import (
    ObservationEngine,
    ObservationSession,
)
from app.observation_repository import ObservationRepository


TRADE_TICKET = 904262255


engine = ObservationEngine()
repository = ObservationRepository()


print("DATABASE OBSERVATIONS BEFORE SAVE")
print(repository.count())


session = ObservationSession(
    trade_ticket=TRADE_TICKET
)


session.add(
    category="entry_thesis",
    value="Price swept liquidity before London open.",
    source="trader",
)


session.add(
    category="confidence",
    value=4,
    source="trader",
)


session.add(
    category="emotion",
    value="confident",
    source="trader",
)


session.add(
    category="reflection",
    value="The entry was good, but I could have held longer.",
    source="trader",
)


committed_observations = session.commit(engine)


saved_observations = repository.save_many(
    committed_observations
)


print("\nSAVE RESULT")
print(f"Saved observations: {len(saved_observations)}")
print(f"Database observation count: {repository.count()}")


print(f"\nSAVED OBSERVATIONS FOR TRADE {TRADE_TICKET}")

database_observations = repository.get_by_trade(
    TRADE_TICKET
)

for observation in database_observations:
    print(observation.to_dict())