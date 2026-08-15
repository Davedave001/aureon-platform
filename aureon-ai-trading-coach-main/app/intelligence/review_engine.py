from typing import Any

from app.decision_record_repository import (
    DecisionRecordRepository,
)
from app.intelligence.observations import (
    ObservationSession,
)
from app.observation_repository import (
    ObservationRepository,
)


class TradeReviewEngine:
    """
    Coordinates Aureon's trade-review workflow.

    The Review Engine:

    - identifies trades that still need review;
    - starts a review session;
    - asks one question at a time;
    - stores draft answers;
    - commits completed observations permanently.
    """

    REVIEW_QUESTIONS = [
        {
            "category": "entry_thesis",
            "question": (
                "What made you believe this trade "
                "was worth taking?"
            ),
        },
        {
            "category": "confidence",
            "question": (
                "How confident were you before "
                "entering? Use a score from 1 to 5."
            ),
        },
        {
            "category": "emotion",
            "question": (
                "How were you feeling before "
                "entering this trade?"
            ),
        },
        {
            "category": "reflection",
            "question": (
                "Looking back, what would you "
                "repeat or change?"
            ),
        },
    ]

    def __init__(self):
        self.decision_repository = (
            DecisionRecordRepository()
        )

        self.observation_repository = (
            ObservationRepository()
        )

        self._sessions: dict[
            int,
            ObservationSession,
        ] = {}

    def pending_reviews(
        self,
    ) -> list[dict[str, Any]]:
        """
        Return trades that do not yet contain a complete review.
        """

        records = self.decision_repository.get_all()

        pending = []

        required_categories = {
            question["category"]
            for question in self.REVIEW_QUESTIONS
        }

        for record in records:
            existing_categories = {
                observation.category
                for observation in record.observations
                if observation.source == "trader"
            }

            missing_categories = sorted(
                required_categories
                - existing_categories
            )

            if not missing_categories:
                continue

            pending.append({
                "trade_ticket": record.trade_ticket,
                "symbol": record.symbol,
                "direction": record.direction,
                "open_time": record.open_time,
                "close_time": record.close_time,
                "net_result": record.net_result,
                "outcome": record.outcome,
                "missing_categories": missing_categories,
            })

        return pending

    def start(
        self,
        trade_ticket: int,
    ) -> dict[str, Any]:
        """
        Start or resume a review session for one trade.
        """

        record = self.decision_repository.get_by_trade(
            trade_ticket
        )

        if record is None:
            raise ValueError(
                f"Trade ticket {trade_ticket} "
                "does not exist."
            )

        if trade_ticket not in self._sessions:
            session = ObservationSession(
                trade_ticket=trade_ticket
            )

            for observation in record.observations:
                if observation.source != "trader":
                    continue

                session.add(
                    category=observation.category,
                    value=observation.value,
                    source=observation.source,
                    confidence=observation.confidence,
                    notes=observation.notes,
                )

            self._sessions[trade_ticket] = session

        session = self._sessions[trade_ticket]

        return {
            "trade": record.to_dict(),
            "review": self.status(trade_ticket),
        }

    def answer(
        self,
        trade_ticket: int,
        category: str,
        value: Any,
        source: str = "trader",
        confidence: float = 1.0,
        notes: str | None = None,
    ) -> dict[str, Any]:
        """
        Add or replace one answer in the active review session.
        """

        session = self._get_session(
            trade_ticket
        )

        observation = session.add(
            category=category,
            value=value,
            source=source,
            confidence=confidence,
            notes=notes,
        )

        return {
            "saved_draft": observation.to_dict(),
            "review": self.status(trade_ticket),
        }

    def next_question(
        self,
        trade_ticket: int,
    ) -> dict[str, str] | None:
        """
        Return the next unanswered review question.
        """

        session = self._get_session(
            trade_ticket
        )

        for question in self.REVIEW_QUESTIONS:
            if session.get(
                question["category"]
            ) is None:
                return question

        return None

    def status(
        self,
        trade_ticket: int,
    ) -> dict[str, Any]:
        """
        Return the current progress of a review session.
        """

        session = self._get_session(
            trade_ticket
        )

        next_question = self.next_question(
            trade_ticket
        )

        total_questions = len(
            self.REVIEW_QUESTIONS
        )

        answered_questions = (
            session.count()
        )

        progress = round(
            answered_questions
            / total_questions
            * 100,
            2,
        )

        return {
            "trade_ticket": trade_ticket,
            "answered_questions": answered_questions,
            "total_questions": total_questions,
            "progress": progress,
            "complete": session.is_complete(),
            "missing_categories": (
                session.missing_categories()
            ),
            "next_question": next_question,
            "committed": session.committed,
        }

    def finish(
        self,
        trade_ticket: int,
    ) -> dict[str, Any]:
        """
        Permanently save a completed review.
        """

        session = self._get_session(
            trade_ticket
        )

        if not session.is_complete():
            raise ValueError(
                "The review is incomplete. Missing: "
                + ", ".join(
                    session.missing_categories()
                )
            )

        from app.intelligence.observations import (
            ObservationEngine,
        )

        observation_engine = (
            ObservationEngine()
        )

        committed_observations = (
            session.commit(
                observation_engine
            )
        )

        saved_observations = (
            self.observation_repository.save_many(
                committed_observations
            )
        )

        return {
            "message": (
                "Trade review completed successfully."
            ),
            "trade_ticket": trade_ticket,
            "saved_observations": len(
                saved_observations
            ),
            "observations": [
                observation.to_dict()
                for observation
                in saved_observations
            ],
        }

    def _get_session(
        self,
        trade_ticket: int,
    ) -> ObservationSession:
        """
        Return an active session or start one automatically.
        """

        if trade_ticket not in self._sessions:
            self.start(trade_ticket)

        return self._sessions[
            trade_ticket
        ]