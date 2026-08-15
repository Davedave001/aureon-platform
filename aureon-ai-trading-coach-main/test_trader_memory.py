from app.observation_repository import ObservationRepository
from app.intelligence.trader_memory import TraderMemoryEngine


TRADE_TICKET = 904262255

repository = ObservationRepository()

memory = TraderMemoryEngine()

observations = repository.get_by_trade(
    TRADE_TICKET
)

memory.learn(observations)

print("TRADER MEMORY PROFILE")
print(memory.build_profile())