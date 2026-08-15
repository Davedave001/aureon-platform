from typing import Any, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.intelligence.observations import (
    ObservationEngine,
    ObservationSession,
)
from app.observation_repository import ObservationRepository


router = APIRouter(
    prefix="/observations",
    tags=["Observations"],
)

repository = ObservationRepository()


class ObservationInput(BaseModel):
    category: str = Field(
        min_length=1,
        examples=["entry_thesis"],
    )

    value: Any

    source: str = Field(
        default="trader",
        examples=["trader"],
    )

    confidence: float = Field(
        default=1.0,
        ge=0.0,
        le=1.0,
    )

    notes: Optional[str] = None


class TradeObservationRequest(BaseModel):
    observations: list[ObservationInput]


@router.post("/{trade_ticket}")
def save_trade_observations(
    trade_ticket: int,
    request: TradeObservationRequest,
):
    """
    Save or update observations for a specific trade.
    """

    if trade_ticket <= 0:
        raise HTTPException(
            status_code=400,
            detail="Trade ticket must be greater than zero.",
        )

    if not request.observations:
        raise HTTPException(
            status_code=400,
            detail="At least one observation is required.",
        )

    engine = ObservationEngine()

    observation_session = ObservationSession(
        trade_ticket=trade_ticket
    )

    try:
        for item in request.observations:
            observation_session.add(
                category=item.category,
                value=item.value,
                source=item.source,
                confidence=item.confidence,
                notes=item.notes,
            )

        committed_observations = (
            observation_session.commit(engine)
        )

        saved_observations = repository.save_many(
            committed_observations
        )

        return {
            "message": "Observations saved successfully.",
            "trade_ticket": trade_ticket,
            "saved_count": len(saved_observations),
            "observations": [
                observation.to_dict()
                for observation in saved_observations
            ],
        }

    except ValueError as error:
        raise HTTPException(
            status_code=404,
            detail=str(error),
        ) from error

    except (TypeError, RuntimeError) as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        ) from error


@router.get("/{trade_ticket}")
def get_trade_observations(
    trade_ticket: int,
):
    """
    Return all stored observations for a specific trade.
    """

    if trade_ticket <= 0:
        raise HTTPException(
            status_code=400,
            detail="Trade ticket must be greater than zero.",
        )

    observations = repository.get_by_trade(
        trade_ticket
    )

    return {
        "trade_ticket": trade_ticket,
        "observation_count": len(observations),
        "observations": [
            observation.to_dict()
            for observation in observations
        ],
    }


@router.get("/")
def get_observation_summary():
    """
    Return the total number of stored observations.
    """

    return {
        "total_observations": repository.count()
    }