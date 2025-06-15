import os
import logging
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from dotenv import load_dotenv

load_dotenv()

class MongoDBClient:
    _client: AsyncIOMotorClient | None = None
    _db: AsyncIOMotorDatabase | None = None

    @classmethod
    def get_client(cls) -> AsyncIOMotorClient:
        if cls._client is None:
            uri = os.getenv("CONNECTION_STRING")
            if not uri:
                raise ValueError("CONNECTION_STRING env variable is not set")

            cls._client = AsyncIOMotorClient(
                uri,
                maxPoolSize=int(os.getenv("MONGO_MAX_POOL_SIZE", 100)),
                minPoolSize=int(os.getenv("MONGO_MIN_POOL_SIZE", 10)),
            )
            logging.info(f"MongoDB client initialized with URI: {uri}")
        return cls._client

    @classmethod
    def get_database(cls) -> AsyncIOMotorDatabase:
        if cls._db is None:
            db_name = os.getenv("DATABASE_NAME")
            if not db_name:
                raise ValueError("DATABASE_NAME env variable is not set")

            cls._db = cls.get_client()[db_name]
            logging.info(f"MongoDB database selected: {db_name}")
        return cls._db

