import os
from typing import Any

import httpx
from mcp.server.fastmcp import FastMCP


mcp = FastMCP("Aureon AI Trading Coach")

BASE_URL = "http://127.0.0.1:8000/api/v1"


async def get_api_data(endpoint: str) -> Any:
    """
    Send a GET request to the Aureon FastAPI server.
    """

    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.get(
                f"{BASE_URL}{endpoint}"
            )

            response.raise_for_status()

            return response.json()

        except httpx.ConnectError:
            return {
                "error": "FastAPI server is not running.",
                "message": (
                    "Start FastAPI with: "
                    "uvicorn server:app --reload"
                ),
            }

        except httpx.HTTPStatusError as error:
            try:
                detail = error.response.json()
            except ValueError:
                detail = error.response.text

            return {
                "error": "FastAPI request failed.",
                "status_code": error.response.status_code,
                "detail": detail,
            }

        except httpx.RequestError as error:
            return {
                "error": "Unable to contact FastAPI.",
                "detail": str(error),
            }


# =====================================================
# PERFORMANCE TOOLS
# =====================================================

@mcp.tool()
async def get_expectancy():
    """Get current trading expectancy metrics."""

    return await get_api_data(
        "/performance/expectancy"
    )


@mcp.tool()
async def get_summary():
    """Get the current overall trading performance summary."""

    return await get_api_data(
        "/performance/summary"
    )


@mcp.tool()
async def get_risk_reward():
    """Get current risk-reward metrics."""

    return await get_api_data(
        "/performance/risk-reward"
    )


@mcp.tool()
async def get_session_analysis():
    """Analyze current performance by trading session."""

    return await get_api_data(
        "/context/sessions"
    )


@mcp.tool()
async def get_monthly_performance():
    """Analyze current trading performance by month."""

    return await get_api_data(
        "/context/monthly"
    )


@mcp.tool()
async def get_drawdown_analysis():
    """Analyze current drawdown and recovery metrics."""

    return await get_api_data(
        "/performance/drawdown"
    )


@mcp.tool()
async def get_equity_curve():
    """Get the current trade-by-trade equity curve."""

    return await get_api_data(
        "/performance/equity-curve"
    )


@mcp.tool()
async def get_active_goal():
    """Get the trader's active performance goal and progress."""

    return await get_api_data(
        "/performance/active-goal"
    )


# =====================================================
# BEHAVIOR TOOLS
# =====================================================

@mcp.tool()
async def detect_revenge_trading():
    """Detect potential revenge-trading behavior from trade timing."""

    return await get_api_data(
        "/behavior/revenge-trading"
    )


@mcp.tool()
async def detect_overtrading():
    """Detect potential overtrading behavior."""

    return await get_api_data(
        "/behavior/overtrading"
    )


# =====================================================
# AUREON INTELLIGENCE TOOLS
# =====================================================

@mcp.tool()
async def coach_trader():
    """
    Primary source of truth for questions about what Aureon has
    learned about the trader, confirmed edges, weaknesses, behavior,
    progress, and recommended next actions.

    Always use this tool for broad coaching questions instead of
    recalled conversation memory or legacy strategy-based analysis.
    """

    return await get_api_data(
        "/intelligence/coach"
    )


@mcp.tool()
async def get_trader_memory():
    """
    Get Aureon's current evidence-based Trader Memory profile.

    Use this for questions about what Aureon currently remembers or
    has learned from reviewed trades and stored observations.
    """

    return await get_api_data(
        "/trader-memory/"
    )


@mcp.tool()
async def discover_trading_edge():
    """
    Discover evidence-based recurring trading edges.

    Aureon only confirms an edge when repeated observed decisions can
    be connected to measurable trade outcomes. It returns insufficient
    evidence when the reviewed sample is too small.
    """

    return await get_api_data(
        "/intelligence/edge-discovery"
    )


@mcp.tool()
async def get_observed_decision_records():
    """
    Get all reviewed trades that contain stored observations.

    Each Decision Record combines broker facts, observations,
    and the measurable trade outcome.
    """

    return await get_api_data(
        "/intelligence/decision-records/observed"
    )


@mcp.tool()
async def get_decision_record(
    trade_ticket: int,
):
    """
    Get one Decision Record by broker trade ticket.
    """

    return await get_api_data(
        f"/intelligence/decision-records/{trade_ticket}"
    )


@mcp.tool()
async def get_trade_observations(
    trade_ticket: int,
):
    """
    Get all stored observations for one trade ticket.
    """

    return await get_api_data(
        f"/observations/{trade_ticket}"
    )


@mcp.tool()
async def get_observation_summary():
    """Get the total number of permanently stored observations."""

    return await get_api_data(
        "/observations/"
    )


# =====================================================
# INTERNAL LEGACY FUNCTIONS
# Not exposed to Claude as MCP tools.
# =====================================================

async def analyze_my_edge():
    """
    Legacy analytics-based edge summary.
    """

    return await get_api_data(
        "/performance/coach"
    )


async def get_trading_coach_report():
    """
    Legacy human-readable coaching report.
    """

    return await get_api_data(
        "/performance/coach-report"
    )


async def get_pattern_detection():
    """
    Legacy strategy, setup, and emotion pattern detection.
    """

    return await get_api_data(
        "/context/patterns"
    )


async def get_strategy_performance():
    """
    Legacy strategy performance analysis.
    """

    return await get_api_data(
        "/context/strategies"
    )


async def get_emotion_performance():
    """
    Legacy emotion performance analysis.
    """

    return await get_api_data(
        "/context/emotions"
    )


async def get_setup_performance():
    """
    Legacy setup performance analysis.
    """

    return await get_api_data(
        "/context/setups"
    )


async def get_strategy_emotion_performance():
    """
    Legacy strategy and emotion combination analysis.
    """

    return await get_api_data(
        "/context/strategy-emotions"
    )


async def analyze_trade_notes():
    """
    Legacy trade-note behavior analysis.
    """

    return await get_api_data(
        "/behavior/trade-notes"
    )


async def get_behavioral_insights():
    """
    Legacy behavioral insights based on sample journal notes.
    """

    return await get_api_data(
        "/behavior/insights"
    )


# =====================================================
# SYSTEM TOOLS
# =====================================================

@mcp.tool()
async def health_check():
    """Check whether the Aureon MCP server is running."""

    return {
        "status": "Aureon MCP server is running 🚀"
    }


@mcp.tool()
async def import_status():
    """Check whether the local trading database exists."""

    database_path = "db/trader_journal.db"

    return {
        "database_exists": os.path.exists(
            database_path
        ),
        "database_path": database_path,
        "message": (
            "Use the FastAPI CSV upload endpoint "
            "to import broker trade history."
        ),
    }


if __name__ == "__main__":
    print(
        "🚀 Aureon AI Trading Coach starting... "
        "waiting for client connection"
    )

    mcp.run()