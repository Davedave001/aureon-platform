import os

from fastapi import FastAPI

from app.database import set_current_account
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

# Shared secret so only the Aureon API (not the public internet) can reach the
# coach. Set COACH_SECRET in this container and send it as X-Coach-Secret.
COACH_SECRET = os.environ.get("COACH_SECRET")

_PUBLIC_PATHS = {"/", "/docs", "/openapi.json", "/redoc"}


class TenantMiddleware:
    """Pure-ASGI middleware (not BaseHTTPMiddleware, so the contextvar it sets
    is reliably visible to the endpoint that runs in the same context).

    - Rejects requests without the shared secret (when one is configured).
    - Requires an X-Account-Id header and pins the request to that account's
      isolated database.
    """

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        path = scope.get("path", "")
        if path in _PUBLIC_PATHS:
            await self.app(scope, receive, send)
            return

        headers = {k.decode().lower(): v.decode() for k, v in scope.get("headers", [])}

        if COACH_SECRET and headers.get("x-coach-secret") != COACH_SECRET:
            await _send_json(send, 401, '{"detail":"Unauthorized"}')
            return

        account = headers.get("x-account-id", "").strip()
        if not account:
            await _send_json(send, 400, '{"detail":"Missing X-Account-Id"}')
            return

        set_current_account(account)
        await self.app(scope, receive, send)


async def _send_json(send, status: int, body: str) -> None:
    await send(
        {
            "type": "http.response.start",
            "status": status,
            "headers": [(b"content-type", b"application/json")],
        }
    )
    await send({"type": "http.response.body", "body": body.encode()})


app.add_middleware(TenantMiddleware)


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