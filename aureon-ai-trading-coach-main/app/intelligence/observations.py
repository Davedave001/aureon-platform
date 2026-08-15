from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Optional


@dataclass
class Observation:
    """
    Represents one piece of knowledge about a trading decision.

    Raw trade facts remain fixed, while observations may evolve as
    the trader and Aureon learn more.
    """

    trade_ticket: int
    category: str
    value: Any
    source: str
    confidence: float = 1.0
    notes: Optional[str] = None
    created_at: datetime = field(
        default_factory=lambda: datetime.now(timezone.utc)
    )

    def __post_init__(self):
        allowed_sources = {
            "trader",
            "ai",
            "broker",
            "system",
        }

        self.category = self.category.strip().lower()
        self.source = self.source.strip().lower()

        if not isinstance(self.trade_ticket, int):
            raise TypeError(
                "Trade ticket must be an integer."
            )

        if self.trade_ticket <= 0:
            raise ValueError(
                "Trade ticket must be greater than zero."
            )

        if not self.category:
            raise ValueError(
                "Observation category cannot be empty."
            )

        if self.source not in allowed_sources:
            raise ValueError(
                f"Unsupported observation source: {self.source}"
            )

        if not 0 <= self.confidence <= 1:
            raise ValueError(
                "Confidence must be between 0 and 1."
            )

    def to_dict(self) -> dict:
        return {
            "trade_ticket": self.trade_ticket,
            "category": self.category,
            "value": self.value,
            "source": self.source,
            "confidence": self.confidence,
            "notes": self.notes,
            "created_at": self.created_at.isoformat(),
        }


class ObservationEngine:
    """
    Manages Aureon's trade observations.

    This first version stores observations in memory. Database
    persistence will be added after the engine behavior is verified.
    """

    def __init__(self):
        self._observations: list[Observation] = []

    def add(self, observation: Observation) -> Observation:
        if not isinstance(observation, Observation):
            raise TypeError(
                "Only Observation objects can be added."
            )

        self._observations.append(observation)

        return observation

    def get_all(self) -> list[Observation]:
        return list(self._observations)

    def get_by_trade(
        self,
        trade_ticket: int
    ) -> list[Observation]:

        return [
            observation
            for observation in self._observations
            if observation.trade_ticket == trade_ticket
        ]

    def get_by_category(
        self,
        category: str
    ) -> list[Observation]:

        normalized_category = category.strip().lower()

        return [
            observation
            for observation in self._observations
            if observation.category == normalized_category
        ]

    def get_by_source(
        self,
        source: str
    ) -> list[Observation]:

        normalized_source = source.strip().lower()

        return [
            observation
            for observation in self._observations
            if observation.source == normalized_source
        ]

    def get_latest(
        self,
        trade_ticket: int,
        category: str
    ) -> Optional[Observation]:

        matching_observations = [
            observation
            for observation in self._observations
            if (
                observation.trade_ticket == trade_ticket
                and observation.category
                == category.strip().lower()
            )
        ]

        if not matching_observations:
            return None

        return max(
            matching_observations,
            key=lambda observation: observation.created_at
        )

    def count(self) -> int:
        return len(self._observations)

    def clear(self) -> None:
        self._observations.clear()

class ObservationSession:
    """
    Collects observations for one trade before they are permanently saved.

    The session acts like a draft. Observations can be added, replaced,
    reviewed, and then committed when the trade review is complete.
    """

    def __init__(self, trade_ticket: int):
        if not isinstance(trade_ticket, int):
            raise TypeError(
                "Trade ticket must be an integer."
            )

        if trade_ticket <= 0:
            raise ValueError(
                "Trade ticket must be greater than zero."
            )

        self.trade_ticket = trade_ticket
        self._observations: dict[str, Observation] = {}
        self._committed = False

    def add(
        self,
        category: str,
        value: Any,
        source: str,
        confidence: float = 1.0,
        notes: Optional[str] = None,
    ) -> Observation:

        if self._committed:
            raise RuntimeError(
                "Cannot modify a committed observation session."
            )

        observation = Observation(
            trade_ticket=self.trade_ticket,
            category=category,
            value=value,
            source=source,
            confidence=confidence,
            notes=notes,
        )

        self._observations[
            observation.category
        ] = observation

        return observation

    def remove(
        self,
        category: str
    ) -> Optional[Observation]:

        if self._committed:
            raise RuntimeError(
                "Cannot modify a committed observation session."
            )

        normalized_category = category.strip().lower()

        return self._observations.pop(
            normalized_category,
            None
        )

    def get(
        self,
        category: str
    ) -> Optional[Observation]:

        normalized_category = category.strip().lower()

        return self._observations.get(
            normalized_category
        )

    def get_all(self) -> list[Observation]:
        return list(
            self._observations.values()
        )

    def count(self) -> int:
        return len(self._observations)

    def is_complete(self) -> bool:
        required_categories = {
            "entry_thesis",
            "confidence",
            "emotion",
            "reflection",
        }

        return required_categories.issubset(
            self._observations.keys()
        )

    def missing_categories(self) -> list[str]:
        required_categories = {
            "entry_thesis",
            "confidence",
            "emotion",
            "reflection",
        }

        return sorted(
            required_categories
            - self._observations.keys()
        )

    def commit(
        self,
        engine: ObservationEngine
    ) -> list[Observation]:

        if self._committed:
            raise RuntimeError(
                "Observation session has already been committed."
            )

        if not isinstance(engine, ObservationEngine):
            raise TypeError(
                "A valid ObservationEngine is required."
            )

        committed_observations = []

        for observation in self.get_all():
            engine.add(observation)
            committed_observations.append(
                observation
            )

        self._committed = True

        return committed_observations

    @property
    def committed(self) -> bool:
        return self._committed