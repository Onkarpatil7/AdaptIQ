from app.db.database import Base, engine
from app.db import models

def create_datasets_table():

    print("Creating datasets table...")

    Base.metadata.create_all(
        bind=engine,
        tables=[models.Dataset.__table__]
    )

    print("Datasets table created successfully!")


if __name__ == "__main__":
    create_datasets_table()