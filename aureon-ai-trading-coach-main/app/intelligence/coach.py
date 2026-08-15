from typing import Any

from app.intelligence.edge_engine import EdgeDiscoveryEngine
from app.intelligence.trader_memory import TraderMemoryEngine
from app.intelligence.observations import Observation
from app.intelligence.decision_record import DecisionRecord


class AureonCoach:
    """
    Generates evidence-based coaching using Aureon's intelligence layer.

    The coach uses:

    - Trader Memory
    - Observed Decision Records
    - Evidence-based Edge Discovery

    It does not depend on legacy strategy, setup, emotion, or notes
    stored directly in the trades table.
    """

    def __init__(self):
        self.memory = TraderMemoryEngine()
        self.edge_engine = EdgeDiscoveryEngine()
        self._records: list[DecisionRecord] = []

    def learn(
        self,
        records: list[DecisionRecord],
    ) -> None:
        """
        Load observed Decision Records into the coach.
        """

        for record in records:
            if not isinstance(record, DecisionRecord):
                raise TypeError(
                    "AureonCoach can only learn from "
                    "DecisionRecord objects."
                )

        self._records = list(records)

        observations: list[Observation] = []

        for record in self._records:
            observations.extend(
                record.observations
            )

        self.memory.learn(observations)
        self.edge_engine.learn(self._records)

    def generate_report(self) -> dict[str, Any]:
        """
        Generate Aureon's current coaching report.
        """

        memory_profile = self.memory.build_profile()
        edge_profile = self.edge_engine.discover()

        return {
            "coach": "Aureon AI Trading Coach",
            "observed_trades": len(self._records),
            "memory": memory_profile,
            "edge_discovery": edge_profile,
            "assessment": self._assessment(
                memory_profile,
                edge_profile,
            ),
            "action_plan": self._action_plan(
                memory_profile,
                edge_profile,
            ),
        }

    def _assessment(
        self,
        memory_profile: dict[str, Any],
        edge_profile: dict[str, Any],
    ) -> list[str]:
        assessment = []

        observed_trades = len(self._records)

        if observed_trades == 0:
            assessment.append(
                "Aureon has not reviewed any trades yet."
            )

            assessment.append(
                "Importing trades provides performance facts, "
                "but reviewed observations are required for "
                "personalized coaching."
            )

            return assessment

        assessment.append(
            f"Aureon has reviewed {observed_trades} "
            f"trade(s) and stored "
            f"{memory_profile['observation_count']} observations."
        )

        average_confidence = memory_profile.get(
            "average_confidence"
        )

        if average_confidence is not None:
            assessment.append(
                f"Your average self-reported confidence is "
                f"{average_confidence} out of 5."
            )

        common_emotion = memory_profile.get(
            "most_common_emotion"
        )

        if common_emotion:
            assessment.append(
                f"Your most frequently recorded emotion is "
                f"{common_emotion['value']}."
            )

        if edge_profile["status"] == "Insufficient evidence":
            assessment.append(
                "Aureon does not yet have enough repeated "
                "decision evidence to declare a trading edge."
            )

            assessment.append(
                edge_profile["reason"]
            )

        else:
            primary_edge = edge_profile.get(
                "primary_edge"
            )

            if primary_edge:
                assessment.append(
                    "A recurring edge has been detected in "
                    f"trades described as "
                    f"'{primary_edge['entry_thesis']}'."
                )

                assessment.append(
                    f"This pattern currently has "
                    f"{primary_edge['trades']} trades, "
                    f"a {primary_edge['win_rate']}% win rate, "
                    f"and expectancy of "
                    f"{primary_edge['expectancy']} per trade."
                )

        return assessment

    def _action_plan(
        self,
        memory_profile: dict[str, Any],
        edge_profile: dict[str, Any],
    ) -> list[str]:
        actions = []

        if len(self._records) < 3:
            actions.append(
                "Review at least three real trades so Aureon "
                "can begin testing repeated decision patterns."
            )

        category_counts = memory_profile.get(
            "category_counts",
            {},
        )

        required_categories = {
            "entry_thesis",
            "confidence",
            "emotion",
            "reflection",
        }

        missing_categories = sorted(
            category
            for category in required_categories
            if category_counts.get(category, 0) == 0
        )

        if missing_categories:
            actions.append(
                "Add the following missing observations: "
                + ", ".join(missing_categories)
                + "."
            )

        if edge_profile["status"] == "Insufficient evidence":
            actions.append(
                "Do not treat any current observation as a "
                "confirmed edge until the pattern repeats across "
                "multiple trades."
            )
        else:
            actions.append(
                "Continue recording the same observations and "
                "monitor whether the discovered edge remains "
                "profitable as the sample grows."
            )

        actions.append(
            "Keep imported broker facts unchanged and add only "
            "the decision context that the broker cannot know."
        )

        return actions