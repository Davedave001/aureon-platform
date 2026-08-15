import contextvars
import os
import re

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Base class for models
Base = declarative_base()

# Where per-account SQLite files live. Point COACH_DB_DIR at a persistent
# volume in production so data survives redeploys.
DB_DIR = os.environ.get("COACH_DB_DIR", "db")
DEFAULT_ACCOUNT = "default"

# The account (tenant) for the current request. Set by the tenant middleware
# from the X-Account-Id header the Aureon API injects. Falls back to a shared
# "default" account for local use, scripts, and tests.
_current_account: contextvars.ContextVar[str] = contextvars.ContextVar(
    "current_account", default=DEFAULT_ACCOUNT
)

_engines: dict = {}
_sessionmakers: dict = {}

# Only allow filesystem-safe characters in the DB filename.
_SAFE = re.compile(r"[^A-Za-z0-9_-]")


def set_current_account(account_id) -> None:
    _current_account.set(str(account_id) if account_id else DEFAULT_ACCOUNT)


def get_current_account() -> str:
    return _current_account.get()


def _safe_key(account_id) -> str:
    key = _SAFE.sub("_", str(account_id))[:120]
    return key or DEFAULT_ACCOUNT


def _ensure(account_id):
    """Lazily build (and remember) the engine + sessionmaker for an account,
    creating its tables on first use. Each account gets its own SQLite file so
    tenants are fully isolated with no query changes elsewhere."""
    key = _safe_key(account_id)
    if key not in _engines:
        os.makedirs(DB_DIR, exist_ok=True)
        eng = create_engine(
            f"sqlite:///{DB_DIR}/account_{key}.db",
            echo=False,
            connect_args={"check_same_thread": False},
        )
        # Import models so the metadata is populated before create_all.
        import app.models  # noqa: F401

        Base.metadata.create_all(eng)
        _engines[key] = eng
        _sessionmakers[key] = sessionmaker(
            autocommit=False, autoflush=False, bind=eng
        )
    return _engines[key], _sessionmakers[key]


def get_engine():
    """The SQLAlchemy engine for the current request's account."""
    engine_, _ = _ensure(get_current_account())
    return engine_


def get_sessionmaker():
    _, maker = _ensure(get_current_account())
    return maker


def SessionLocal():
    """Drop-in replacement for the old global sessionmaker. Existing call sites
    do ``SessionLocal()`` and get a session bound to the current account."""
    return get_sessionmaker()()
