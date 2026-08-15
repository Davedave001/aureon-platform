from fastapi import APIRouter

from app.analytics import (
    get_pair_performance,
    get_session_analysis,
    get_day_of_week_analysis,
    get_trade_duration_analysis,
    get_strategy_performance,
    get_emotion_performance,
    get_setup_performance,
    get_monthly_performance,
    get_strategy_emotion_performance,
    get_pattern_detection
)

router = APIRouter(prefix="/context", tags=["Context"])


@router.get("/pairs")
def pairs():
    return {
        "status": "success",
        "data": get_pair_performance()
    }


@router.get("/sessions")
def sessions():
    return {
        "status": "success",
        "data": get_session_analysis()
    }


@router.get("/days")
def days():
    return {
        "status": "success",
        "data": get_day_of_week_analysis()
    }


@router.get("/duration")
def duration():
    return {
        "status": "success",
        "data": get_trade_duration_analysis()
    }


@router.get("/strategies")
def strategies():
    return {
        "status": "success",
        "data": get_strategy_performance()
    }

@router.get("/emotions")
def emotions():
    return {
        "status": "success",
        "data": get_emotion_performance()
    }

@router.get("/setups")
def setups():
    return {
        "status": "success",
        "data": get_setup_performance()
    }

@router.get("/monthly")
def monthly():
    return {
        "status": "success",
        "data": get_monthly_performance()
    }

@router.get("/strategy-emotions")
def strategy_emotions():
    return {
        "status": "success",
        "data": get_strategy_emotion_performance()
    }

@router.get("/patterns")
def patterns():
    return {
        "status": "success",
        "data": get_pattern_detection()
    }