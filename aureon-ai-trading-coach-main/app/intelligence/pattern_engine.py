from collections import defaultdict
from typing import Any

from app.intelligence.decision_record import DecisionRecord


class PatternDiscoveryEngine:
    """
    Discovers repeated decision patterns from observed Decision Records.

    This engine measures recurring entry theses and their outcomes.
    It does not decide whether a pattern qualifies as a genuine edge.
    That responsibility belongs to the Edge Discovery Engine.
    """

    def __init__(self):
        self._records: list[DecisionRecord] = []

    def learn(
        self,
        records: list[DecisionRecord],
    ) -> None:
        """
        Load observed Decision Records into the engine.
        """

        for record in records:
            if not isinstance(record, DecisionRecord):
                raise TypeError(
                    "Pattern Discovery can only learn from "
                    "DecisionRecord objects."
                )

        self._records = list(records)

    def discover_patterns(self) -> list[dict[str, Any]]:
        """
        Group observed trades by entry thesis and calculate outcomes.
        """

        grouped_records: dict[
            str,
            list[DecisionRecord],
        ] = defaultdict(list)

        for record in self._records:
            entry_thesis = record.observation_value(
                "entry_thesis"
            )

            if entry_thesis is None:
                continue

            normalized_thesis = (
                str(entry_thesis)
                .strip()
                .lower()
            )

            if not normalized_thesis:
                continue

            grouped_records[
                normalized_thesis
            ].append(record)

        patterns = []

        for thesis, records in grouped_records.items():
            patterns.append(
                self._build_pattern(
                    thesis=thesis,
                    records=records,
                )
            )

        return sorted(
            patterns,
            key=lambda pattern: (
                pattern["trades"],
                pattern["expectancy"],
                pattern["net_result"],
            ),
            reverse=True,
        )

    def _build_pattern(
        self,
        thesis: str,
        records: list[DecisionRecord],
    ) -> dict[str, Any]:
        """
        Build one measurable pattern from matching Decision Records.
        """

        results = [
            record.net_result
            for record in records
        ]

        wins = [
            result
            for result in results
            if result > 0
        ]

        losses = [
            result
            for result in results
            if result < 0
        ]

        breakeven = [
            result
            for result in results
            if result == 0
        ]

        trade_count = len(records)
        net_result = sum(results)

        win_rate = (
            len(wins) / trade_count * 100
            if trade_count > 0
            else 0
        )

        expectancy = (
            net_result / trade_count
            if trade_count > 0
            else 0
        )

        emotions = self._collect_values(
            records=records,
            category="emotion",
        )

        confidence_values = (
            self._collect_numeric_values(
                records=records,
                category="confidence",
            )
        )

        average_confidence = (
            sum(confidence_values)
            / len(confidence_values)
            if confidence_values
            else None
        )

        symbols = sorted({
            record.symbol
            for record in records
        })

        directions = sorted({
            record.direction
            for record in records
        })

        trade_tickets = [
            record.trade_ticket
            for record in records
        ]

        return {
            "entry_thesis": thesis,
            "trades": trade_count,
            "winning_trades": len(wins),
            "losing_trades": len(losses),
            "breakeven_trades": len(breakeven),
            "win_rate": round(win_rate, 2),
            "net_result": round(net_result, 2),
            "expectancy": round(expectancy, 2),
            "average_confidence": (
                round(average_confidence, 2)
                if average_confidence is not None
                else None
            ),
            "emotions": emotions,
            "symbols": symbols,
            "directions": directions,
            "trade_tickets": trade_tickets,
            "evidence_level": self._evidence_level(
                trade_count
            ),
        }

    def _collect_values(
        self,
        records: list[DecisionRecord],
        category: str,
    ) -> list[str]:
        values = set()

        for record in records:
            value = record.observation_value(
                category
            )

            if value is None:
                continue

            normalized_value = (
                str(value)
                .strip()
                .lower()
            )

            if normalized_value:
                values.add(normalized_value)

        return sorted(values)

    def _collect_numeric_values(
        self,
        records: list[DecisionRecord],
        category: str,
    ) -> list[float]:
        values = []

        for record in records:
            value = record.observation_value(
                category
            )

            try:
                values.append(
                    float(value)
                )
            except (TypeError, ValueError):
                continue

        return values

    def _evidence_level(
        self,
        trade_count: int,
    ) -> str:
        if trade_count < 3:
            return "Insufficient"

        if trade_count < 5:
            return "Low"

        if trade_count < 20:
            return "Medium"

        return "High"

    def record_count(self) -> int:
        return len(self._records)

    def clear(self) -> None:
        self._records.clear()