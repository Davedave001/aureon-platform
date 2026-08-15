from app.database import SessionLocal
from app.intelligence.decision_record import DecisionRecord
from app.models import Trade
from app.observation_repository import ObservationRepository


class DecisionRecordRepository:
    """
    Builds Decision Records by combining broker trade facts
    with Aureon's stored observations.
    """

    def __init__(self):
        self.observation_repository = ObservationRepository()

    def get_by_trade(
        self,
        trade_ticket: int,
    ) -> DecisionRecord | None:
        session = SessionLocal()

        try:
            trade = (
                session.query(Trade)
                .filter_by(ticket=trade_ticket)
                .first()
            )

            if trade is None:
                return None

            observations = (
                self.observation_repository.get_by_trade(
                    trade_ticket
                )
            )

            return DecisionRecord(
                trade_ticket=trade.ticket,
                symbol=trade.symbol,
                direction=trade.direction,
                open_time=trade.open_time,
                close_time=trade.close_time,
                volume=trade.volume,
                profit=trade.profit,
                commission=trade.commission or 0.0,
                swap=trade.swap or 0.0,
                observations=observations,
            )

        finally:
            session.close()

    def get_all(self) -> list[DecisionRecord]:
        session = SessionLocal()

        try:
            trades = (
                session.query(Trade)
                .order_by(Trade.open_time.asc())
                .all()
            )

            records = []

            for trade in trades:
                observations = (
                    self.observation_repository.get_by_trade(
                        trade.ticket
                    )
                )

                records.append(
                    DecisionRecord(
                        trade_ticket=trade.ticket,
                        symbol=trade.symbol,
                        direction=trade.direction,
                        open_time=trade.open_time,
                        close_time=trade.close_time,
                        volume=trade.volume,
                        profit=trade.profit,
                        commission=trade.commission or 0.0,
                        swap=trade.swap or 0.0,
                        observations=observations,
                    )
                )

            return records

        finally:
            session.close()

    def get_observed(self) -> list[DecisionRecord]:
        """
        Return only trades that have at least one observation.
        """

        return [
            record
            for record in self.get_all()
            if record.observations
        ]