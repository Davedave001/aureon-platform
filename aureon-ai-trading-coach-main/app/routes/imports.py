from fastapi import APIRouter, UploadFile, File
import pandas as pd
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Trade

router = APIRouter(
    prefix="/imports",
    tags=["Imports"]
)


@router.post("/mt5")
async def import_mt5(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)

    db: Session = SessionLocal()

    imported = 0
    skipped = 0

    for _, row in df.iterrows():

        existing_trade = (
            db.query(Trade)
            .filter(Trade.ticket == int(row["ticket"]))
            .first()
        )

        if existing_trade:
            skipped += 1
            continue

        trade = Trade(
            ticket=int(row["ticket"]),
            symbol=row["symbol"],
            direction=row["direction"],
            open_time=row["open_time"],
            close_time=row["close_time"],
            volume=float(row["volume"]),
            open_price=float(row["open_price"]),
            close_price=float(row["close_price"]),
            profit=float(row["profit"]),
            commission=float(row["commission"]),
            swap=float(row["swap"]),
            strategy=row.get("strategy") if pd.notnull(row.get("strategy")) else None,
            setup=row.get("setup") if pd.notnull(row.get("setup")) else None,
            emotion=row.get("emotion") if pd.notnull(row.get("emotion")) else None,
            notes=row.get("notes") if pd.notnull(row.get("notes")) else None
        )

        db.add(trade)
        imported += 1

    db.commit()
    db.close()

    return {
        "imported": imported,
        "skipped_duplicates": skipped
    }