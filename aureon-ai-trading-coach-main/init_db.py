from app.database import get_engine
from app.models import Base


def init_database():
    # Creating the engine for the default account also creates its tables.
    # Per-account databases are created lazily on first request.
    Base.metadata.create_all(get_engine())
    print("Trader Journal DB initialized successfully")


if __name__ == "__main__":
    init_database()
