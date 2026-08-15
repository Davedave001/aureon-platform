from app.database import engine
from app.models import Base

def init_database():
    Base.metadata.create_all(engine)
    print("Trader Journal DB initialized successfully")

if __name__ == "__main__":
    init_database()