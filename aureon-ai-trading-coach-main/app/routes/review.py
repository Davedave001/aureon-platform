from fastapi import APIRouter
from typing import Any, Optional

from pydantic import BaseModel, Field

from app.intelligence.review_engine import (
    TradeReviewEngine,
)

router = APIRouter(
    prefix="/review",
    tags=["Trade Review"],
)

engine = TradeReviewEngine()

class ReviewAnswerRequest(BaseModel):
    category: str = Field(min_length=1)
    value: Any
    source: str = "trader"
    confidence: float = Field(
        default=1.0,
        ge=0.0,
        le=1.0,
    )
    notes: Optional[str] = None


@router.get("/pending")
def pending_reviews():
    """
    Return every trade that still requires review.
    """
    return {
        "pending_reviews": engine.pending_reviews()
    }


@router.get("/{trade_ticket}")
def start_review(
    trade_ticket: int,
):
    """
    Start or resume reviewing one trade.
    """
    return engine.start(trade_ticket)


@router.get("/{trade_ticket}/next")
def next_question(
    trade_ticket: int,
):
    """
    Return the next unanswered review question.
    """
    return {
        "question": engine.next_question(
            trade_ticket
        )
    }


@router.get("/{trade_ticket}/status")
def review_status(
    trade_ticket: int,
):
    """
    Return review progress.
    """
    return engine.status(
        trade_ticket
    )

@router.post("/{trade_ticket}/answer")
def answer_review_question(
    trade_ticket: int,
    request: ReviewAnswerRequest,
):
    """
    Save or replace one draft answer in the active review session.
    """

    return engine.answer(
        trade_ticket=trade_ticket,
        category=request.category,
        value=request.value,
        source=request.source,
        confidence=request.confidence,
        notes=request.notes,
    )


@router.post("/{trade_ticket}/finish")
def finish_review(
    trade_ticket: int,
):
    """
    Permanently save a completed trade review.
    """

    return engine.finish(
        trade_ticket
    )