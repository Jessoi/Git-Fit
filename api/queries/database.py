from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Define the SQLAlchemy database URL based on your environment
# DATABASE_URL: postgresql://gitfit:secret@postgres/gitfitdb
DATABASE_URL = "postgresql://gitfit:secret@postgres/gitfitdb"

# Create a SQLAlchemy engine to connect to the database
engine = create_engine(DATABASE_URL)

# Create a Session class to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define a base class for your database models (if you have any)
Base = declarative_base()
