from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import dotenv
import os

dotenv.load_dotenv(dotenv.find_dotenv())

MONGO_DB_USER = os.environ.get("MONGO_DB_USER")
MONGO_DB_PASSWORD = os.environ.get("MONGO_DB_PASSWORD")

conn_str = f"mongodb+srv://{MONGO_DB_USER}:{MONGO_DB_PASSWORD}@cluster0.c7qgqmn.mongodb.net/?retryWrites=true&w=majority"
# Set the Stable API version on the client.
client = MongoClient(conn_str, server_api=ServerApi('1'), serverSelectionTimeoutMS=5000)
db = client.school


def add_to_database(data: list, data_type: str):
    if data_type == "assignments":
        collection = db.assignments
        for item in data:
            if collection.count_documents({"id": item.id}) == 0:
                obj = {
                    "id": item.id,
                    "name": item.name,
                    "link": item.link,
                    "due_date": item.due_date,
                    "lock_date": item.lock_date,
                    "title": item.title,
                    "manual_status": item.manual_status,
                    "canvas_status": item.canvas_status,
                    "description": item.description
                }
                collection.insert_one(obj)
