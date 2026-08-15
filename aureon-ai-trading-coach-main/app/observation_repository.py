import json
from typing import Any

from app.database import SessionLocal
from app.intelligence.observations import Observation
from app.models import Trade, TradeObservation


class ObservationRepository:
    """
    Stores and retrieves trade observations.

    This repository isolates database operations from Aureon's
    intelligence layer.
    """

    @staticmethod
    def _serialize_value(value: Any) -> str:
        return json.dumps(value)

    @staticmethod
    def _deserialize_value(value: str) -> Any:
        try:
            return json.loads(value)
        except (json.JSONDecodeError, TypeError):
            return value

    def save_many(
        self,
        observations: list[Observation],
    ) -> list[Observation]:
        """
        Save observations permanently.

        If an observation already exists with the same trade ticket,
        category, and source, update it instead of creating a duplicate.
        """

        if not observations:
            return []

        session = SessionLocal()

        try:
            saved_observations = []

            for observation in observations:
                trade_exists = (
                    session.query(Trade)
                    .filter_by(
                        ticket=observation.trade_ticket
                    )
                    .first()
                )

                if not trade_exists:
                    raise ValueError(
                        f"Trade ticket "
                        f"{observation.trade_ticket} "
                        "does not exist."
                    )

                existing_observation = (
                    session.query(TradeObservation)
                    .filter_by(
                        trade_ticket=observation.trade_ticket,
                        category=observation.category,
                        source=observation.source,
                    )
                    .order_by(
                        TradeObservation.created_at.desc()
                    )
                    .first()
                )

                if existing_observation:
                    existing_observation.value = (
                        self._serialize_value(
                            observation.value
                        )
                    )

                    existing_observation.confidence = (
                        observation.confidence
                    )

                    existing_observation.notes = (
                        observation.notes
                    )

                    existing_observation.created_at = (
                        observation.created_at
                    )

                else:
                    database_observation = TradeObservation(
                        trade_ticket=observation.trade_ticket,
                        category=observation.category,
                        value=self._serialize_value(
                            observation.value
                        ),
                        source=observation.source,
                        confidence=observation.confidence,
                        notes=observation.notes,
                        created_at=observation.created_at,
                    )

                    session.add(database_observation)

                saved_observations.append(observation)

            session.commit()

            return saved_observations

        except Exception:
            session.rollback()
            raise

        finally:
            session.close()

    def get_by_trade(
        self,
        trade_ticket: int,
    ) -> list[Observation]:
        """
        Return all observations for one trade.
        """

        session = SessionLocal()

        try:
            rows = (
                session.query(TradeObservation)
                .filter_by(
                    trade_ticket=trade_ticket
                )
                .order_by(
                    TradeObservation.created_at.asc()
                )
                .all()
            )

            return [
                Observation(
                    trade_ticket=row.trade_ticket,
                    category=row.category,
                    value=self._deserialize_value(
                        row.value
                    ),
                    source=row.source,
                    confidence=row.confidence,
                    notes=row.notes,
                    created_at=row.created_at,
                )
                for row in rows
            ]

        finally:
            session.close()

    def get_all(self) -> list[Observation]:
        """
        Return every stored observation.
        """

        session = SessionLocal()

        try:
            rows = (
                session.query(TradeObservation)
                .order_by(
                    TradeObservation.created_at.asc()
                )
                .all()
            )

            return [
                Observation(
                    trade_ticket=row.trade_ticket,
                    category=row.category,
                    value=self._deserialize_value(
                        row.value
                    ),
                    source=row.source,
                    confidence=row.confidence,
                    notes=row.notes,
                    created_at=row.created_at,
                )
                for row in rows
            ]

        finally:
            session.close()

    def count(self) -> int:
        """
        Return the total number of stored observations.
        """

        session = SessionLocal()

        try:
            return (
                session.query(TradeObservation)
                .count()
            )

        finally:
            session.close()