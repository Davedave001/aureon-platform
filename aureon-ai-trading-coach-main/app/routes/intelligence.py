from fastapi import APIRouter, HTTPException
from app.intelligence.coach import AureonCoach

from app.decision_record_repository import (
    DecisionRecordRepository,
)
from app.intelligence.edge_engine import (
    EdgeDiscoveryEngine,
)


router = APIRouter(
    prefix="/intelligence",
    tags=["Aureon Intelligence"],
)

decision_repository = DecisionRecordRepository()


@router.get("/decision-records")
def get_decision_records():
    """
    Return all trades combined with their saved observations.
    """

    records = decision_repository.get_all()

    return {
        "record_count": len(records),
        "records": [
            record.to_dict()
            for record in records
        ],
    }


@router.get("/decision-records/observed")
def get_observed_decision_records():
    """
    Return only trades that have at least one saved observation.
    """

    records = decision_repository.get_observed()

    return {
        "observed_record_count": len(records),
        "records": [
            record.to_dict()
            for record in records
        ],
    }


@router.get("/decision-records/{trade_ticket}")
def get_decision_record(
    trade_ticket: int,
):
    """
    Return one Decision Record by its broker trade ticket.
    """

    if trade_ticket <= 0:
        raise HTTPException(
            status_code=400,
            detail="Trade ticket must be greater than zero.",
        )

    record = decision_repository.get_by_trade(
        trade_ticket
    )

    if record is None:
        raise HTTPException(
            status_code=404,
            detail=(
                f"Trade ticket {trade_ticket} "
                "was not found."
            ),
        )

    return {
        "record": record.to_dict()
    }


@router.get("/edge-discovery")
def discover_trading_edge():
    """
    Discover recurring trading edges from observed Decision Records.
    """

    records = decision_repository.get_observed()

    engine = EdgeDiscoveryEngine()
    engine.learn(records)

    return engine.discover()

@router.get("/coach")
def get_aureon_coach_report():
    """
    Generate the primary Aureon coaching report from observed
    Decision Records, Trader Memory, and Edge Discovery.
    """

    records = decision_repository.get_observed()

    coach = AureonCoach()
    coach.learn(records)

    return coach.generate_report()    