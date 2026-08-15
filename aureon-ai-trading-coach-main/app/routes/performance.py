from fastapi import APIRouter

from app.analytics import (
    get_performance_summary,
    get_trade_statistics,
    get_expectancy,
    get_risk_reward_ratio,
    get_drawdown_analysis,
    get_equity_curve,
    analyze_my_edge,
    get_trading_coach_report,
    get_active_goal
)

router = APIRouter(prefix="/performance", tags=["Performance"])


@router.get("/summary")
def summary():
    return {
        "status": "success",
        "data": get_performance_summary()
    }


@router.get("/statistics")
def statistics():
    return {
        "status": "success",
        "data": get_trade_statistics()
    }


@router.get("/expectancy")
def expectancy():
    return {
        "status": "success",
        "data": get_expectancy()
    }


@router.get("/risk-reward")
def risk_reward():
    return {
        "status": "success",
        "data": get_risk_reward_ratio()
    }

@router.get("/drawdown")
def drawdown():
    return {
        "status": "success",
        "data": get_drawdown_analysis()
    }

@router.get("/equity-curve")
def equity_curve():
    return {
        "status": "success",
        "data": get_equity_curve()
    }

@router.get("/coach")
def coach():
    return {
        "status": "success",
        "data": analyze_my_edge()
    }

@router.get("/coach-report")
def coach_report():
    return {
        "status": "success",
        "data": get_trading_coach_report()
    }

@router.get("/active-goal")
def active_goal():
    return {
        "status": "success",
        "data": get_active_goal()
    }
