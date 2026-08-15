from typing import Any

from app.intelligence.decision_record import (
    DecisionRecord,
)
from app.intelligence.pattern_engine import (
    PatternDiscoveryEngine,
)


class EdgeDiscoveryEngine:
    """
    Evaluates recurring trading patterns and determines
    whether they qualify as genuine trading edges.

    Pattern discovery is delegated to PatternDiscoveryEngine.
    """

    MINIMUM_PATTERN_TRADES = 3

    def __init__(self):
        self.pattern_engine = (
            PatternDiscoveryEngine()
        )

    def learn(
        self,
        records: list[DecisionRecord],
    ) -> None:
        """
        Load Decision Records into the Pattern Engine.
        """

        self.pattern_engine.learn(records)

    def discover(self) -> dict[str, Any]:
        """
        Evaluate recurring patterns and identify
        evidence-based trading edges.
        """

        observed_trades = (
            self.pattern_engine.record_count()
        )

        if observed_trades == 0:
            return self._insufficient_evidence(
                observed_trades,
                "No observed decision records are available.",
            )

        if (
            observed_trades
            < self.MINIMUM_PATTERN_TRADES
        ):
            return self._insufficient_evidence(
                observed_trades,
                (
                    f"Only {observed_trades} observed "
                    f"trade(s) are available. "
                    f"At least "
                    f"{self.MINIMUM_PATTERN_TRADES} "
                    "are required before Aureon can "
                    "evaluate recurring edges."
                ),
            )

        patterns = (
            self.pattern_engine
            .discover_patterns()
        )

        eligible_patterns = [
            pattern
            for pattern in patterns
            if pattern["trades"]
            >= self.MINIMUM_PATTERN_TRADES
        ]

        if not eligible_patterns:
            return self._insufficient_evidence(
                observed_trades,
                (
                    "No recurring decision pattern "
                    "currently satisfies Aureon's "
                    "minimum evidence requirements."
                ),
            )

        primary_edge = eligible_patterns[0]

        weaknesses = sorted(
            [
                pattern
                for pattern in eligible_patterns
                if pattern["expectancy"] < 0
            ],
            key=lambda pattern:
                pattern["expectancy"]
        )

        return {
            "status": "Edge discovered",
            "observed_trades": observed_trades,
            "minimum_pattern_trades":
                self.MINIMUM_PATTERN_TRADES,
            "primary_edge": primary_edge,
            "secondary_edges":
                eligible_patterns[1:3],
            "recurring_weaknesses":
                weaknesses[:3],
            "next_focus": (
                "Continue reviewing trades so "
                "Aureon can strengthen or reject "
                "the discovered edge."
            ),
        }

    def _insufficient_evidence(
        self,
        observed_trades: int,
        reason: str,
    ) -> dict[str, Any]:

        return {
            "status": "Insufficient evidence",
            "observed_trades":
                observed_trades,
            "minimum_pattern_trades":
                self.MINIMUM_PATTERN_TRADES,
            "primary_edge": None,
            "secondary_edges": [],
            "recurring_weaknesses": [],
            "reason": reason,
            "next_focus": (
                "Review more real trades so "
                "Aureon can validate recurring "
                "decision patterns."
            ),
        }