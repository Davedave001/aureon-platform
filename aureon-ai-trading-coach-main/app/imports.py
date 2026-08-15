import pandas as pd

from app.database import SessionLocal
from app.models import Trade


def import_trades(csv_path: str) -> None:
    df = pd.read_csv(csv_path)

    # Normalize column names
    df.columns = df.columns.str.strip().str.lower()

    # Detect and normalize Exness export format
    if {
        "type",
        "opening_time_utc",
        "closing_time_utc",
        "lots",
        "opening_price",
        "closing_price"
    }.issubset(df.columns):

        source = "Exness"

        df = df.rename(
            columns={
                "type": "direction",
                "opening_time_utc": "open_time",
                "closing_time_utc": "close_time",
                "lots": "volume",
                "opening_price": "open_price",
                "closing_price": "close_price"
            }
        )

    # Detect the existing normalized MT5 format
    elif {
        "direction",
        "open_time",
        "close_time",
        "volume",
        "open_price",
        "close_price"
    }.issubset(df.columns):

        source = "MT5"

    else:
        raise ValueError(
            "Unsupported CSV format. The file does not match "
            "the expected MT5 or Exness trade-history format."
        )

    required_columns = [
        "ticket",
        "symbol",
        "direction",
        "open_time",
        "close_time",
        "volume",
        "open_price",
        "close_price",
        "profit",
        "commission",
        "swap"
    ]

    missing_columns = [
        column
        for column in required_columns
        if column not in df.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Missing required columns: {missing_columns}"
        )

    # Keep direction values consistent
    df["direction"] = (
        df["direction"]
        .astype(str)
        .str.strip()
        .str.upper()
    )

    session = SessionLocal()

    imported = 0
    skipped = 0

    try:
        for _, row in df.iterrows():
            ticket = int(row["ticket"])

            existing_trade = (
                session.query(Trade)
                .filter_by(ticket=ticket)
                .first()
            )

            if existing_trade:
                skipped += 1
                continue

            trade = Trade(
                ticket=ticket,
                symbol=str(row["symbol"]).strip().upper(),
                direction=row["direction"],
                open_time=str(row["open_time"]),
                close_time=str(row["close_time"]),
                volume=float(row["volume"]),
                open_price=float(row["open_price"]),
                close_price=float(row["close_price"]),
                profit=float(row["profit"]),
                commission=float(row["commission"]),
                swap=float(row["swap"])
            )

            session.add(trade)
            imported += 1

        session.commit()

        print(
            f"Source: {source} | "
            f"Imported: {imported} | "
            f"Skipped duplicates: {skipped}"
        )

    except Exception:
        session.rollback()
        raise

    finally:
        session.close()