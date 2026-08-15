from sqlalchemy import Column, DateTime, Float, Integer, String, Text
from sqlalchemy.sql import func

from app.database import Base


class Trade(Base):
    __tablename__ = "trades"

    id = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    ticket = Column(
        Integer,
        unique=True,
        nullable=False,
        index=True
    )

    symbol = Column(String, nullable=False)
    direction = Column(String, nullable=False)

    open_time = Column(String, nullable=False)
    close_time = Column(String, nullable=False)

    volume = Column(Float, nullable=False)

    open_price = Column(Float, nullable=False)
    close_price = Column(Float, nullable=False)

    profit = Column(Float, nullable=False)

    commission = Column(
        Float,
        default=0.0
    )

    swap = Column(
        Float,
        default=0.0
    )

    # Legacy journal fields.
    # Keep them temporarily so existing code does not break.
    strategy = Column(
        String,
        nullable=True
    )

    setup = Column(
        String,
        nullable=True
    )

    emotion = Column(
        String,
        nullable=True
    )

    notes = Column(
        Text,
        nullable=True
    )


class TradeObservation(Base):
    __tablename__ = "trade_observations"

    id = Column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    trade_ticket = Column(
        Integer,
        nullable=False,
        index=True
    )

    category = Column(
        String,
        nullable=False,
        index=True
    )

    value = Column(
        Text,
        nullable=False
    )

    source = Column(
        String,
        nullable=False,
        index=True
    )

    confidence = Column(
        Float,
        nullable=False,
        default=1.0
    )

    notes = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now()
    )