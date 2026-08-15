from fastapi import FastAPI

from app.routes.performance import router as performance_router
from app.routes.behavior import router as behavior_router
from app.routes.context import router as context_router
from app.routes.imports import router as imports_router
from app.routes.observations import router as observations_router
from app.routes.trader_memory import router as trader_memory_router
from app.routes.review import router as review_router
from app.routes.intelligence import router as intelligence_router
from app.routes.review import (
    router as review_router,
)

app = FastAPI(
    title="Trader Journal MCP",
    description="AI-powered trading analytics engine",
    version="0.1.0"
)

API_PREFIX = "/api/v1"


@app.get("/")
def home():
    return {
        "message": "Trader Journal MCP is running"
    }


app.include_router(
    performance_router,
    prefix=API_PREFIX
)

app.include_router(
    behavior_router,
    prefix=API_PREFIX
)

app.include_router(
    context_router,
    prefix=API_PREFIX
)

app.include_router(
    imports_router,
    prefix=API_PREFIX
)

app.include_router(
    observations_router,
    prefix=API_PREFIX
)

app.include_router(
    trader_memory_router,
    prefix=API_PREFIX
)

app.include_router(
    intelligence_router,
    prefix=API_PREFIX
)

app.include_router(
    review_router,
    prefix=API_PREFIX,
)