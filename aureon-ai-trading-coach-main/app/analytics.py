import pandas as pd
from sqlalchemy import text

from app.database import engine


def parse_trade_datetime(series):
    """Parse trade timestamps that may use different datetime formats."""
    return pd.to_datetime(
        series,
        format="mixed",
        errors="coerce"
    )



def get_performance_summary():

    query = text("SELECT * FROM trades")

    df = pd.read_sql(query, engine)

    total_trades = len(df)

    winning_trades = len(df[df["profit"] > 0])

    losing_trades = len(df[df["profit"] < 0])

    win_rate = (
        round((winning_trades / total_trades) * 100, 2)
        if total_trades > 0
        else 0
    )

    net_profit = df["profit"].sum()

    return {
        "total_trades": total_trades,
        "winning_trades": winning_trades,
        "losing_trades": losing_trades,
        "win_rate": win_rate,
        "net_profit": float(net_profit)
    }

def get_pair_performance():

    query = text("""
        SELECT
            symbol,
            SUM(profit) as total_profit,
            COUNT(*) as trades
        FROM trades
        GROUP BY symbol
        ORDER BY total_profit DESC
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {
            "best_pair": None,
            "worst_pair": None
        }

    best_pair = df.iloc[0]
    worst_pair = df.iloc[-1]

    return {
        "best_pair": {
            "symbol": best_pair["symbol"],
            "profit": float(best_pair["total_profit"]),
            "trades": int(best_pair["trades"])
        },
        "worst_pair": {
            "symbol": worst_pair["symbol"],
            "profit": float(worst_pair["total_profit"]),
            "trades": int(worst_pair["trades"])
        }
    }

def get_trade_statistics():

    query = text("SELECT profit FROM trades")

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {}

    wins = df[df["profit"] > 0]["profit"]
    losses = df[df["profit"] < 0]["profit"]

    gross_profit = wins.sum()

    gross_loss = abs(losses.sum())

    profit_factor = (
        round(gross_profit / gross_loss, 2)
        if gross_loss > 0
        else None
    )

    return {
        "profit_factor": float(profit_factor) if profit_factor is not None else None,
        "average_win": float(round(wins.mean(), 2)) if len(wins) > 0 else 0,
        "average_loss": float(round(losses.mean(), 2)) if len(losses) > 0 else 0,
        "largest_win": float(wins.max()) if len(wins) > 0 else 0,
        "largest_loss": float(losses.min()) if len(losses) > 0 else 0,
        "gross_profit": float(gross_profit),
        "gross_loss": float(gross_loss)
    }
 
def get_streak_analysis():

    query = text("""
        SELECT profit
        FROM trades
        ORDER BY id
    """)

    df = pd.read_sql(query, engine)

    longest_win_streak = 0
    longest_loss_streak = 0

    current_win_streak = 0
    current_loss_streak = 0

    for profit in df["profit"]:

        if profit > 0:
            current_win_streak += 1
            current_loss_streak = 0

        elif profit < 0:
            current_loss_streak += 1
            current_win_streak = 0

        longest_win_streak = max(
            longest_win_streak,
            current_win_streak
        )

        longest_loss_streak = max(
            longest_loss_streak,
            current_loss_streak
        )

    return {
        "longest_win_streak": longest_win_streak,
        "longest_loss_streak": longest_loss_streak
    }

def get_session_analysis():

    query = text("""
        SELECT
            open_time,
            profit
        FROM trades
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {}

    df["open_time"] = parse_trade_datetime(df["open_time"])
    df = df.dropna(subset=["open_time"])

    def classify_session(hour):

        if 0 <= hour < 8:
            return "Asian"

        elif 8 <= hour < 16:
            return "London"

        else:
            return "New York"

    df["session"] = df["open_time"].dt.hour.apply(
        classify_session
    )

    session_profit = (
        df.groupby("session")["profit"]
        .sum()
        .sort_values(ascending=False)
    )

    best_session = session_profit.index[0]
    worst_session = session_profit.index[-1]

    return {
        "session_profit": session_profit.to_dict(),
        "best_session": {
            "name": best_session,
            "profit": float(session_profit.iloc[0])
        },
        "worst_session": {
            "name": worst_session,
            "profit": float(session_profit.iloc[-1])
        }
    }

def get_day_of_week_analysis():

    query = text("""
        SELECT
            open_time,
            profit
        FROM trades
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {}

    df["open_time"] = parse_trade_datetime(df["open_time"])
    df = df.dropna(subset=["open_time"])

    df["day"] = df["open_time"].dt.day_name()

    day_profit = (
        df.groupby("day")["profit"]
        .sum()
        .sort_values(ascending=False)
    )

    best_day = day_profit.index[0]
    worst_day = day_profit.index[-1]

    return {
        "day_profit": day_profit.to_dict(),
        "best_day": {
            "name": best_day,
            "profit": float(day_profit.iloc[0])
        },
        "worst_day": {
            "name": worst_day,
            "profit": float(day_profit.iloc[-1])
        }
    }

def get_expectancy():

    query = text("""
        SELECT profit
        FROM trades
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {}

    wins = df[df["profit"] > 0]["profit"]
    losses = df[df["profit"] < 0]["profit"]

    win_rate = len(wins) / len(df)

    loss_rate = len(losses) / len(df)

    avg_win = wins.mean() if len(wins) > 0 else 0

    avg_loss = losses.mean() if len(losses) > 0 else 0

    expectancy = (
        win_rate * avg_win
    ) + (
        loss_rate * avg_loss
    )

    return {
        "win_rate": round(win_rate, 4),
        "loss_rate": round(loss_rate, 4),
        "average_win": float(avg_win),
        "average_loss": float(avg_loss),
        "expectancy": round(float(expectancy), 2)
    }

def get_trade_duration_analysis():

    query = text("""
        SELECT
            open_time,
            close_time,
            profit
        FROM trades
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {}

    df["open_time"] = parse_trade_datetime(df["open_time"])
    df["close_time"] = parse_trade_datetime(df["close_time"])

    df = df.dropna(subset=["open_time", "close_time"])

    df["duration_minutes"] = (
        df["close_time"] - df["open_time"]
    ).dt.total_seconds() / 60

    winners = df[df["profit"] > 0]
    losers = df[df["profit"] < 0]

    return {
        "average_duration_minutes": round(
            float(df["duration_minutes"].mean()), 2
        ),
        "average_winning_duration": round(
            float(winners["duration_minutes"].mean()), 2
        ) if len(winners) > 0 else 0,
        "average_losing_duration": round(
            float(losers["duration_minutes"].mean()), 2
        ) if len(losers) > 0 else 0
    }

def detect_revenge_trading():

    query = text("""
        SELECT
            ticket,
            open_time,
            close_time,
            profit
        FROM trades
        ORDER BY open_time
    """)

    df = pd.read_sql(query, engine)

    if len(df) < 2:
        return {
            "potential_revenge_trades": 0,
            "tickets": []
        }

    df["open_time"] = parse_trade_datetime(df["open_time"])
    df["close_time"] = parse_trade_datetime(df["close_time"])

    df = df.dropna(subset=["open_time", "close_time"])
    df = df.sort_values("open_time").reset_index(drop=True)

    revenge_tickets = []

    for i in range(1, len(df)):

        previous_trade = df.iloc[i - 1]
        current_trade = df.iloc[i]

        if previous_trade["profit"] < 0:

            minutes_between = (
                current_trade["open_time"]
                - previous_trade["close_time"]
            ).total_seconds() / 60

            if 0 <= minutes_between <= settings.revenge_window_minutes:
                revenge_tickets.append(
                    int(current_trade["ticket"])
                )

    return {
        "potential_revenge_trades": len(revenge_tickets),
        "tickets": revenge_tickets
    }

from app.config import settings

def detect_overtrading(
    max_trades_per_day=settings.overtrading_threshold
):

    query = text("""
        SELECT
            open_time,
            profit
        FROM trades
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {}

    df["open_time"] = parse_trade_datetime(df["open_time"])
    df = df.dropna(subset=["open_time"])

    df["trade_date"] = df["open_time"].dt.date

    daily_stats = (
        df.groupby("trade_date")
        .agg(
            trades=("profit", "count"),
            profit=("profit", "sum")
        )
        .reset_index()
    )

    overtrading_days = daily_stats[
        daily_stats["trades"] > max_trades_per_day
    ]

    return {
        "average_trades_per_day": round(
            float(daily_stats["trades"].mean()), 2
        ),
        "max_trades_per_day": max_trades_per_day,
        "days_with_overtrading": len(overtrading_days),
        "overtrading_dates": [
            str(date)
            for date in overtrading_days["trade_date"]
        ]
    }

def get_risk_reward_ratio():

    query = text("""
        SELECT profit
        FROM trades
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {}

    wins = df[df["profit"] > 0]["profit"]
    losses = df[df["profit"] < 0]["profit"]

    if len(wins) == 0 or len(losses) == 0:
        return {
            "average_win": 0,
            "average_loss": 0,
            "risk_reward_ratio": None,
            "reward_risk_ratio": None
        }

    average_win = float(wins.mean())
    average_loss = abs(float(losses.mean()))

    reward_risk = average_win / average_loss
    risk_reward = average_loss / average_win

    return {
        "average_win": round(average_win, 2),
        "average_loss": round(average_loss, 2),

        # Preferred by many forex traders
        "risk_reward_ratio": f"1:{round(reward_risk, 2)}",

        # Useful for quantitative analysis
        "reward_risk_ratio": round(reward_risk, 2),

        "risk_per_unit_reward": round(risk_reward, 2)
    }

def get_strategy_performance():

    query = text("""
        SELECT
            strategy,
            profit
        FROM trades
        WHERE strategy IS NOT NULL
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {
            "message": "No strategy data available"
        }

    strategy_stats = (
        df.groupby("strategy")
        .agg(
            trades=("profit", "count"),
            net_profit=("profit", "sum"),
            average_profit=("profit", "mean"),
            winning_trades=("profit", lambda x: (x > 0).sum()),
            losing_trades=("profit", lambda x: (x < 0).sum())
        )
        .reset_index()
    )

    strategy_stats["win_rate"] = (
        strategy_stats["winning_trades"]
        / strategy_stats["trades"]
        * 100
    ).round(2)

    strategy_stats = strategy_stats.sort_values(
        by="net_profit",
        ascending=False
    )

    return strategy_stats.to_dict(orient="records")

def get_emotion_performance():

    query = text("""
        SELECT
            emotion,
            profit
        FROM trades
        WHERE emotion IS NOT NULL
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {
            "message": "No emotion data available"
        }

    emotion_stats = (
        df.groupby("emotion")
        .agg(
            trades=("profit", "count"),
            net_profit=("profit", "sum"),
            average_profit=("profit", "mean"),
            winning_trades=("profit", lambda x: (x > 0).sum()),
            losing_trades=("profit", lambda x: (x < 0).sum())
        )
        .reset_index()
    )

    emotion_stats["win_rate"] = (
        emotion_stats["winning_trades"]
        / emotion_stats["trades"]
        * 100
    ).round(2)

    emotion_stats = emotion_stats.sort_values(
        by="net_profit",
        ascending=False
    )

    return emotion_stats.to_dict(orient="records")

def get_setup_performance():

    query = text("""
        SELECT
            setup,
            profit
        FROM trades
        WHERE setup IS NOT NULL
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {
            "message": "No setup data available"
        }

    setup_stats = (
        df.groupby("setup")
        .agg(
            trades=("profit", "count"),
            net_profit=("profit", "sum"),
            average_profit=("profit", "mean"),
            winning_trades=("profit", lambda x: (x > 0).sum()),
            losing_trades=("profit", lambda x: (x < 0).sum())
        )
        .reset_index()
    )

    setup_stats["win_rate"] = (
        setup_stats["winning_trades"]
        / setup_stats["trades"]
        * 100
    ).round(2)

    setup_stats = setup_stats.sort_values(
        by="net_profit",
        ascending=False
    )

    return setup_stats.to_dict(orient="records")

def get_monthly_performance():

    query = text("""
        SELECT
            open_time,
            profit
        FROM trades
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {
            "message": "No trade data available"
        }

    df["open_time"] = parse_trade_datetime(df["open_time"])
    df = df.dropna(subset=["open_time"])

    df["month"] = df["open_time"].dt.to_period("M").astype(str)

    monthly_stats = (
        df.groupby("month")
        .agg(
            trades=("profit", "count"),
            net_profit=("profit", "sum"),
            average_profit=("profit", "mean"),
            winning_trades=("profit", lambda x: (x > 0).sum()),
            losing_trades=("profit", lambda x: (x < 0).sum())
        )
        .reset_index()
    )

    monthly_stats["win_rate"] = (
        monthly_stats["winning_trades"]
        / monthly_stats["trades"]
        * 100
    ).round(2)

    monthly_stats = monthly_stats.sort_values(
        by="month",
        ascending=True
    )

    return monthly_stats.to_dict(orient="records")

def get_drawdown_analysis():

    query = text("""
        SELECT
            open_time,
            profit
        FROM trades
        ORDER BY open_time
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {
            "message": "No trade data available"
        }

    df["open_time"] = parse_trade_datetime(df["open_time"])
    df = df.dropna(subset=["open_time"])
    df = df.sort_values("open_time").reset_index(drop=True)

    df["equity"] = df["profit"].cumsum()

    df["equity_peak"] = df["equity"].cummax()

    df["drawdown"] = df["equity"] - df["equity_peak"]

    max_drawdown = df["drawdown"].min()

    net_profit = df["profit"].sum()

    recovery_factor = (
        net_profit / abs(max_drawdown)
        if max_drawdown < 0
        else None
    )

    return {
        "net_profit": round(float(net_profit), 2),
        "max_drawdown": round(float(max_drawdown), 2),
        "current_equity": round(float(df["equity"].iloc[-1]), 2),
        "equity_peak": round(float(df["equity_peak"].max()), 2),
        "recovery_factor": round(float(recovery_factor), 2)
        if recovery_factor is not None
        else None
    }

def get_strategy_emotion_performance():

    query = text("""
        SELECT
            strategy,
            emotion,
            profit
        FROM trades
        WHERE strategy IS NOT NULL
        AND emotion IS NOT NULL
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {
            "message": "No strategy and emotion data available"
        }

    combo_stats = (
        df.groupby(["strategy", "emotion"])
        .agg(
            trades=("profit", "count"),
            net_profit=("profit", "sum"),
            average_profit=("profit", "mean"),
            winning_trades=("profit", lambda x: (x > 0).sum()),
            losing_trades=("profit", lambda x: (x < 0).sum())
        )
        .reset_index()
    )

    combo_stats["win_rate"] = (
        combo_stats["winning_trades"]
        / combo_stats["trades"]
        * 100
    ).round(2)

    combo_stats = combo_stats.sort_values(
        by="net_profit",
        ascending=False
    )

    return combo_stats.to_dict(orient="records")

def get_equity_curve():

    query = text("""
        SELECT
            ticket,
            open_time,
            profit
        FROM trades
        ORDER BY open_time
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {
            "message": "No trade data available"
        }

    df["open_time"] = parse_trade_datetime(df["open_time"])
    df = df.dropna(subset=["open_time"])
    df = df.sort_values("open_time").reset_index(drop=True)

    df["equity"] = df["profit"].cumsum()

    # Convert datetime to string for JSON/API responses
    df["open_time"] = df["open_time"].astype(str)

    return df[[
        "ticket",
        "open_time",
        "profit",
        "equity"
    ]].to_dict(orient="records")

def analyze_my_edge():

    summary = get_performance_summary()
    expectancy = get_expectancy()
    risk_reward = get_risk_reward_ratio()
    drawdown = get_drawdown_analysis()
    strategies = get_strategy_performance()
    emotions = get_emotion_performance()
    setups = get_setup_performance()

    best_strategy = strategies[0] if isinstance(strategies, list) and len(strategies) > 0 else None
    worst_strategy = strategies[-1] if isinstance(strategies, list) and len(strategies) > 0 else None

    best_emotion = emotions[0] if isinstance(emotions, list) and len(emotions) > 0 else None
    worst_emotion = emotions[-1] if isinstance(emotions, list) and len(emotions) > 0 else None

    best_setup = setups[0] if isinstance(setups, list) and len(setups) > 0 else None
    worst_setup = setups[-1] if isinstance(setups, list) and len(setups) > 0 else None

    return {
        "overall_performance": {
            "total_trades": summary.get("total_trades"),
            "win_rate": summary.get("win_rate"),
            "net_profit": summary.get("net_profit"),
            "expectancy": expectancy.get("expectancy"),
            "risk_reward_ratio": risk_reward.get("risk_reward_ratio"),
            "max_drawdown": drawdown.get("max_drawdown"),
            "recovery_factor": drawdown.get("recovery_factor")
        },
        "strongest_edges": {
            "best_strategy": best_strategy,
            "best_emotion": best_emotion,
            "best_setup": best_setup
        },
        "weakest_areas": {
            "worst_strategy": worst_strategy,
            "worst_emotion": worst_emotion,
            "worst_setup": worst_setup
        },
        "coach_summary": {
            "main_edge": "Focus on the best-performing strategy, setup, and emotional state.",
            "main_warning": "Avoid the weakest-performing strategy, setup, and emotional condition.",
            "recommendation": "Trade more when your strongest conditions align, and reduce exposure when weak conditions appear."
        }
    }

def get_trading_coach_report():
    """
    Generate the primary evidence-based Aureon coaching report.

    This version uses observed Decision Records, Trader Memory,
    and Edge Discovery. It no longer depends on legacy strategy,
    setup, emotion, or notes fields stored directly in trades.
    """

    from app.decision_record_repository import (
        DecisionRecordRepository,
    )
    from app.intelligence.coach import AureonCoach

    repository = DecisionRecordRepository()

    records = repository.get_observed()

    coach = AureonCoach()
    coach.learn(records)

    return coach.generate_report()


def generate_action_plan():

    summary = generate_executive_summary()
    edge = analyze_my_edge()

    overall = edge["overall_performance"]

    plan = []

    # Focus on your edge
    plan.append(
        f"Continue prioritizing {summary['primary_edge']['pattern']} trades."
    )

    # Biggest risk
    if summary["primary_risk"]["behavior"]:
        plan.append(
            f"Stop trading immediately whenever {summary['primary_risk']['behavior']} behavior appears."
        )

    # Confidence reminder
    if overall["total_trades"] < 30:
        plan.append(
            "Continue journaling every trade. More data will improve the accuracy of future coaching."
        )

    # Strategy reminder
    plan.append(
        "Review every losing trade before placing your next trade."
    )

    # Emotional discipline
    plan.append(
        "Record your emotional state before entering every position."
    )

    return plan

def generate_coach_reasoning():

    edge = analyze_my_edge()
    behavioral = get_behavioral_insights()
    patterns = get_pattern_detection()
    goal = get_active_goal()

    reasoning = []

    overall = edge["overall_performance"]

    best_pattern = patterns["best_pattern"]
    weakest_behavior = behavioral.get("weakest_behavior")

    # Strategy reasoning
    reasoning.append(
        f"Your strongest results consistently come from {best_pattern['strategy']} trades "
        f"during {best_pattern['setup']} when you are {best_pattern['emotion'].lower()}. "
        f"This suggests your trading edge comes from disciplined execution rather than "
        f"constantly changing strategies."
    )

    # Behavioral reasoning
    if weakest_behavior:
        reasoning.append(
            f"{weakest_behavior['category'].capitalize()} is currently the single biggest "
            f"factor preventing further improvement. Reducing this behavior is likely to "
            f"have a greater impact than searching for a new trading strategy."
        )

    # Goal reasoning
    reasoning.append(
        f"You have already achieved {goal['progress']}% of your current goal. Small "
        f"improvements in discipline could be enough to reach your target."
    )

    # System reasoning
    if overall["expectancy"] > 0:
        reasoning.append(
            "Your statistics indicate that your trading system already has a profitable "
            "edge. The focus should now be consistency and emotional control rather than "
            "finding new setups."
        )
    else:
        reasoning.append(
            "Your statistics suggest your current trading approach does not yet have a "
            "consistent edge. Focus on improving execution before increasing trading volume."
        )

    return reasoning


def generate_dynamic_recommendations():

    edge = analyze_my_edge()

    overall = edge["overall_performance"]
    strongest = edge["strongest_edges"]
    weakest = edge["weakest_areas"]

    recommendations = []

    # Overall expectancy
    if overall["expectancy"] is not None:
        if overall["expectancy"] > 0:
            recommendations.append(
                f"Your trading expectancy is positive at {overall['expectancy']}. This means your current trading system has a profitable edge."
            )
        else:
            recommendations.append(
                f"Your trading expectancy is negative at {overall['expectancy']}. Reduce risk and review your strategy before scaling."
            )

    # Win rate check
    if overall["win_rate"] is not None:
        if overall["win_rate"] >= 60:
            recommendations.append(
                f"Your win rate is strong at {overall['win_rate']}%. Focus on preserving this edge with discipline."
            )
        elif overall["win_rate"] < 45:
            recommendations.append(
                f"Your win rate is low at {overall['win_rate']}%. Review your entries and avoid low-quality setups."
            )

    # Drawdown check
    if overall["max_drawdown"] is not None:
        if abs(overall["max_drawdown"]) > overall["net_profit"]:
            recommendations.append(
                "Your drawdown is larger than your net profit. This suggests your risk may be too high."
            )
        else:
            recommendations.append(
                "Your drawdown is controlled relative to your net profit."
            )

    # Strongest edge
    best_strategy = strongest.get("best_strategy")
    best_setup = strongest.get("best_setup")
    best_emotion = strongest.get("best_emotion")

    if best_strategy:
        recommendations.append(
            f"Your best-performing strategy is {best_strategy['strategy']} with {best_strategy['net_profit']} profit and {best_strategy['win_rate']}% win rate."
        )

    if best_setup:
        recommendations.append(
            f"Your strongest setup is {best_setup['setup']}. Consider prioritizing this setup when market conditions align."
        )

    if best_emotion:
        recommendations.append(
            f"You perform best when your emotional state is {best_emotion['emotion']}. Track this before entering trades."
        )

    # Weakest areas
    worst_strategy = weakest.get("worst_strategy")
    worst_setup = weakest.get("worst_setup")
    worst_emotion = weakest.get("worst_emotion")

    if worst_strategy:
        recommendations.append(
            f"Your weakest strategy is {worst_strategy['strategy']}. Consider pausing or reducing this strategy until it improves."
        )

    if worst_setup:
        recommendations.append(
            f"Your weakest setup is {worst_setup['setup']}. Review screenshots and trade notes before taking more of these trades."
        )

    if worst_emotion:
        recommendations.append(
            f"Trades taken while {worst_emotion['emotion']} are hurting performance. Avoid trading when this emotion appears."
        )

    return {
        "recommendations": recommendations
    }

def get_analysis_confidence(total_trades):

    if total_trades < 30:
        return {
            "level": "Low",
            "reason": f"Only {total_trades} trades analyzed. Insights are useful for testing but not statistically strong yet."
        }

    elif total_trades < 100:
        return {
            "level": "Medium",
            "reason": f"{total_trades} trades analyzed. Insights are becoming more reliable, but more data is recommended."
        }

    else:
        return {
            "level": "High",
            "reason": f"{total_trades} trades analyzed. Insights are based on a stronger sample size."
        }
    
def analyze_trade_notes():

    query = text("""
        SELECT
            ticket,
            profit,
            notes
        FROM trades
        WHERE notes IS NOT NULL
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {
            "message": "No trade notes available"
        }

    keywords = {
        "fomo": ["fomo", "missed", "chasing", "chase"],
        "early_entry": ["early", "too early"],
        "revenge": ["revenge", "after loss"],
        "discipline": ["followed plan", "plan", "disciplined"],
        "fear": ["fear", "scared", "hesitated"],
        "confidence": ["confident", "clean", "strong"]
    }

    results = []

    for category, words in keywords.items():

        matching_trades = df[
            df["notes"]
            .str.lower()
            .apply(lambda note: any(word in note for word in words))
        ]

        if len(matching_trades) == 0:
            continue

        wins = matching_trades[matching_trades["profit"] > 0]
        losses = matching_trades[matching_trades["profit"] < 0]

        results.append({
            "category": category,
            "trades": len(matching_trades),
            "net_profit": float(matching_trades["profit"].sum()),
            "winning_trades": len(wins),
            "losing_trades": len(losses),
            "win_rate": round((len(wins) / len(matching_trades)) * 100, 2)
        })

    return results

def get_behavioral_insights():

    notes_analysis = analyze_trade_notes()

    if not isinstance(notes_analysis, list) or len(notes_analysis) == 0:
        return {
            "message": "No behavioral notes data available"
        }

    sorted_by_profit = sorted(
        notes_analysis,
        key=lambda x: x["net_profit"],
        reverse=True
    )

    strongest_behavior = sorted_by_profit[0]
    weakest_behavior = sorted_by_profit[-1]

    insights = []

    if weakest_behavior["net_profit"] < 0:
        insights.append(
            f"Your most costly behavior is {weakest_behavior['category']} with {weakest_behavior['net_profit']} profit and {weakest_behavior['win_rate']}% win rate."
        )

    if strongest_behavior["net_profit"] > 0:
        insights.append(
            f"Your strongest behavior is {strongest_behavior['category']} with {strongest_behavior['net_profit']} profit and {strongest_behavior['win_rate']}% win rate."
        )

    if weakest_behavior["category"] in ["revenge", "fomo", "early_entry"]:
        insights.append(
            f"Create a rule to pause trading when {weakest_behavior['category']} appears in your behavior."
        )

    if strongest_behavior["category"] in ["discipline", "confidence"]:
        insights.append(
            f"Your data suggests you perform better when trading with {strongest_behavior['category']}."
        )

    return {
        "strongest_behavior": strongest_behavior,
        "weakest_behavior": weakest_behavior,
        "insights": insights
    }


def get_pattern_detection():

    query = text("""
        SELECT
            strategy,
            setup,
            emotion,
            profit
        FROM trades
        WHERE strategy IS NOT NULL
        AND setup IS NOT NULL
        AND emotion IS NOT NULL
    """)

    df = pd.read_sql(query, engine)

    if len(df) == 0:
        return {
            "message": "No strategy, setup, and emotion data available"
        }

    pattern_stats = (
        df.groupby(["strategy", "setup", "emotion"])
        .agg(
            trades=("profit", "count"),
            net_profit=("profit", "sum"),
            average_profit=("profit", "mean"),
            winning_trades=("profit", lambda x: (x > 0).sum()),
            losing_trades=("profit", lambda x: (x < 0).sum())
        )
        .reset_index()
    )

    pattern_stats["win_rate"] = (
        pattern_stats["winning_trades"]
        / pattern_stats["trades"]
        * 100
    ).round(2)

    pattern_stats = pattern_stats.sort_values(
        by="net_profit",
        ascending=False
    )

    best_pattern = pattern_stats.iloc[0].to_dict()
    worst_pattern = pattern_stats.iloc[-1].to_dict()

    return {
        "best_pattern": best_pattern,
        "worst_pattern": worst_pattern,
        "all_patterns": pattern_stats.to_dict(orient="records")
    }


def get_active_goal():
    """
    Return the trader's current performance goal and progress.

    Version 1 uses win rate as the active goal.
    """

    summary = get_performance_summary()

    current_value = float(
        summary.get("win_rate", 0)
    )

    target_value = 70.0

    progress = (
        current_value / target_value * 100
        if target_value > 0
        else 0
    )

    if current_value >= target_value:
        status = "Completed"
    elif current_value > 0:
        status = "In Progress"
    else:
        status = "Not Started"

    return {
        "goal_type": "win_rate",
        "goal_name": "Reach 70% Win Rate",
        "current_value": round(current_value, 2),
        "target_value": target_value,
        "progress": round(
            min(progress, 100),
            2
        ),
        "status": status,
    }

# =====================================================
# GOAL ENGINE
# =====================================================

WIN_RATE_TARGET = 70


def generate_action_plan():
    """
    Return Aureon's current evidence-based coaching actions.
    """

    from app.decision_record_repository import (
        DecisionRecordRepository,
    )
    from app.intelligence.coach import AureonCoach

    repository = DecisionRecordRepository()
    records = repository.get_observed()

    coach = AureonCoach()
    coach.learn(records)

    report = coach.generate_report()

    return report["action_plan"]

# =====================================================
# EXECUTIVE SUMMARY
# =====================================================

def generate_executive_summary():
    """
    Generate Aureon's evidence-based executive coaching summary.

    This version uses observed Decision Records, Trader Memory,
    and Edge Discovery instead of legacy strategy fields.
    """

    from app.decision_record_repository import (
        DecisionRecordRepository,
    )
    from app.intelligence.coach import AureonCoach

    repository = DecisionRecordRepository()
    records = repository.get_observed()

    coach = AureonCoach()
    coach.learn(records)

    report = coach.generate_report()

    edge_discovery = report["edge_discovery"]
    memory = report["memory"]

    return {
        "coach": report["coach"],
        "observed_trades": report["observed_trades"],
        "memory_status": memory["memory_status"],
        "average_confidence": memory["average_confidence"],
        "most_common_emotion": memory["most_common_emotion"],
        "primary_edge": edge_discovery["primary_edge"],
        "edge_status": edge_discovery["status"],
        "edge_reason": edge_discovery.get("reason"),
        "assessment": report["assessment"],
        "immediate_action": (
            report["action_plan"][0]
            if report["action_plan"]
            else None
        ),
    }