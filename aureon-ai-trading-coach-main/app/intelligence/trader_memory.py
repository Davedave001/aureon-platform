from collections import Counter
from typing import Any

from app.intelligence.observations import Observation


class TraderMemoryEngine:
    """
    Builds an evolving trader profile from stored observations.

    Version 1 focuses on reliable summaries of what the trader has
    explicitly reported or what Aureon has inferred.

    More advanced scoring and pattern discovery will be added later.
    """

    def __init__(self):
        self._observations: list[Observation] = []

    def learn(
        self,
        observations: list[Observation],
    ) -> None:
        """
        Add observations to trader memory.

        Duplicate observations with the same trade ticket, category,
        and source replace the previous value.
        """

        for observation in observations:
            if not isinstance(observation, Observation):
                raise TypeError(
                    "Trader Memory can only learn from "
                    "Observation objects."
                )

            self._replace_or_add(observation)

    def _replace_or_add(
        self,
        new_observation: Observation,
    ) -> None:
        for index, existing in enumerate(
            self._observations
        ):
            same_identity = (
                existing.trade_ticket
                == new_observation.trade_ticket
                and existing.category
                == new_observation.category
                and existing.source
                == new_observation.source
            )

            if same_identity:
                self._observations[index] = (
                    new_observation
                )
                return

        self._observations.append(
            new_observation
        )

    def get_all(self) -> list[Observation]:
        return list(self._observations)

    def count(self) -> int:
        return len(self._observations)

    def trade_count(self) -> int:
        return len({
            observation.trade_ticket
            for observation in self._observations
        })

    def get_by_category(
        self,
        category: str,
    ) -> list[Observation]:
        normalized_category = (
            category.strip().lower()
        )

        return [
            observation
            for observation in self._observations
            if observation.category
            == normalized_category
        ]

    def get_latest_by_category(
        self,
        category: str,
    ) -> Observation | None:
        matching = self.get_by_category(
            category
        )

        if not matching:
            return None

        return max(
            matching,
            key=lambda observation: (
                observation.created_at
            ),
        )

    def category_counts(self) -> dict[str, int]:
        counts = Counter(
            observation.category
            for observation in self._observations
        )

        return dict(counts)

    def value_frequency(
        self,
        category: str,
    ) -> dict[str, int]:
        observations = self.get_by_category(
            category
        )

        values = [
            str(observation.value)
            .strip()
            .lower()
            for observation in observations
        ]

        return dict(Counter(values))

    def most_common_value(
        self,
        category: str,
    ) -> dict[str, Any] | None:
        frequency = self.value_frequency(
            category
        )

        if not frequency:
            return None

        value, count = max(
            frequency.items(),
            key=lambda item: item[1],
        )

        return {
            "value": value,
            "count": count,
        }

    def average_confidence(self) -> float | None:
        confidence_observations = (
            self.get_by_category(
                "confidence"
            )
        )

        numeric_values = []

        for observation in (
            confidence_observations
        ):
            try:
                numeric_values.append(
                    float(observation.value)
                )
            except (TypeError, ValueError):
                continue

        if not numeric_values:
            return None

        return round(
            sum(numeric_values)
            / len(numeric_values),
            2,
        )

    def build_profile(self) -> dict[str, Any]:
        """
        Build the current trader memory profile.

        The profile is intentionally evidence-based. If Aureon does
        not have enough information, it returns None instead of
        inventing a conclusion.
        """

        common_emotion = (
            self.most_common_value(
                "emotion"
            )
        )

        common_entry_thesis = (
            self.most_common_value(
                "entry_thesis"
            )
        )

        latest_reflection = (
            self.get_latest_by_category(
                "reflection"
            )
        )

        return {
            "observation_count": (
                self.count()
            ),
            "trades_observed": (
                self.trade_count()
            ),
            "category_counts": (
                self.category_counts()
            ),
            "average_confidence": (
                self.average_confidence()
            ),
            "most_common_emotion": (
                common_emotion
            ),
            "most_common_entry_thesis": (
                common_entry_thesis
            ),
            "latest_reflection": (
                latest_reflection.value
                if latest_reflection
                else None
            ),
            "memory_status": (
                self._memory_status()
            ),
        }

    def _memory_status(self) -> str:
        observed_trades = self.trade_count()

        if observed_trades == 0:
            return "Empty"

        if observed_trades < 5:
            return "Early"

        if observed_trades < 20:
            return "Developing"

        return "Established"

    def clear(self) -> None:
        self._observations.clear()