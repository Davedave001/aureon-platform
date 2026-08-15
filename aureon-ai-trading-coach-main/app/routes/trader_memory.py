from fastapi import APIRouter

from app.intelligence.trader_memory import TraderMemoryEngine
from app.observation_repository import ObservationRepository


router = APIRouter(
    prefix="/trader-memory",
    tags=["Trader Memory"],
)

repository = ObservationRepository()


@router.get("/")
def get_trader_memory():
    """
    Build and return the trader's current memory profile.
    """

    observations = repository.get_all()

    memory = TraderMemoryEngine()
    memory.learn(observations)

    return {
        "profile": memory.build_profile()
    }