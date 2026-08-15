from dataclasses import dataclass, field
from typing import Any

from app.intelligence.observations import Observation


@dataclass
class DecisionRecord:
    """
    Combines fixed broker trade facts with Aureon's observations.

    Edge discovery must analyze Decision Records rather than
    observations alone because an edge requires both a decision
    pattern and a measurable outcome.
    """

    trade_ticket: int
    symbol: str
    direction: str
    open_time: str
    close_time: str
    volume: float
    profit: float
    commission: float
    swap: float
    observations: list[Observation] = field(
        default_factory=list
    )

    @property
    def net_result(self) -> float:
        return round(
            self.profit
            + self.commission
            + self.swap,
            2
        )

    @property
    def outcome(self) -> str:
        if self.net_result > 0:
            return "win"

        if self.net_result < 0:
            return "loss"

        return "breakeven"

    def observation_value(
        self,
        category: str,
    ) -> Any | None:
        normalized_category = (
            category.strip().lower()
        )

        matching = [
            observation
            for observation in self.observations
            if observation.category
            == normalized_category
        ]

        if not matching:
            return None

        latest = max(
            matching,
            key=lambda observation: (
                observation.created_at
            ),
        )

        return latest.value

    def to_dict(self) -> dict:
        return {
            "trade_ticket": self.trade_ticket,
            "symbol": self.symbol,
            "direction": self.direction,
            "open_time": self.open_time,
            "close_time": self.close_time,
            "volume": self.volume,
            "profit": self.profit,
            "commission": self.commission,
            "swap": self.swap,
            "net_result": self.net_result,
            "outcome": self.outcome,
            "observations": [
                observation.to_dict()
                for observation in self.observations
            ],
        }