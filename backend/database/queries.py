from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from typing import Any, Dict
import dotenv
import os

dotenv.load_dotenv(dotenv.find_dotenv())

MONGO_DB_USER = os.environ.get("MONGO_DB_USER")
MONGO_DB_PASSWORD = os.environ.get("MONGO_DB_PASSWORD")

conn_str = f"mongodb+srv://{MONGO_DB_USER}:{MONGO_DB_PASSWORD}@cluster0.c7qgqmn.mongodb.net/?retryWrites=true&w=majority"
# Set the Stable API version on the client.
client: MongoClient[Dict[str, Any]] = MongoClient(conn_str, server_api=ServerApi('1'), serverSelectionTimeoutMS=5000)
db = client.school

new_announcements = []
new_assignments = []


def add_to_database(data: list, data_type: str):
    """Adds data to the database

    Args:
        data (list): List of data for the given type (differnt for each type)
                     Assignmenr: id, name, link, due_date, lock_date, title, manual_status, canvas_status, description
                     Announcement: id, title, poster_name, course, link, message, post_date
                     Course: course_name, nickname
        data_type (str): one of assignments, announcements, or courses
    """
    if data_type == "assignments":
        collection = db.assignments
        for item in data:
            if collection.count_documents({"id": item.id}) == 0:
                obj = {
                    "id": item.id,
                    "course_name": item.course_name,
                    "link": item.link,
                    "due_date": item.due_date,
                    "lock_date": item.lock_date,
                    "title": item.title,
                    "manual_status": item.manual_status,
                    "canvas_status": item.canvas_status,
                    "description": item.description
                }
                collection.insert_one(obj)
                new_assignments.append(obj)
    elif data_type == "announcements":
        collection = db.announcements
        for item in data:
            if collection.count_documents({"id": item.id}) == 0:
                obj = {
                    "id": item.id,
                    "title": item.title,
                    "poster_name": item.poster_name,
                    "course": item.course,
                    "link": item.link,
                    "message": item.message,
                    "post_date": item.post_date,
                    "mark_read": item.mark_read
                }
                collection.insert_one(obj)
                new_announcements.append(obj)
    elif data_type == "courses":
        collection = db.courses
        for item in data:
            if collection.count_documents({"nickname": item.nickname}) == 0:
                if collection.count_documents({"course_name": item.course_name}) == 0:
                    obj = {
                        "course_name": item.course_name,
                        "nickname": item.nickname
                    }
                    collection.insert_one(obj)
                else:
                    collection.update_one({"course_name": item.course_name}, {'$set': {"nickname": item.nickname}})


def get_course_nickname(code: str):
    """Given a course code, returns the nickname set in Canvas
    for the course
    """
    result = db.courses.find_one({"course_name": code})
    return result['nickname']


def get_from_database() -> dict:
    """Gets all data from the database, returns as a dictionary
    
    # TODO: add description of dictionary
    """
    to_return = {"announcements": [], "assignments": []}
    for item in db.announcements.find():
        if not item['mark_read']:
            to_return['announcements'].append(item)
    for item in db.assignments.find():
        if not item['manual_status']:
            to_return['assignments'].append(item)
    return to_return


def mark_complete_database(identifier: str, data_type: str) -> bool:
    """Modifies the specified item (by given id)
    to be marked complete

    Args:
        identifier: the id of the assignment to mark as complete
        data_type: Whether the item is an announcement or an assignment
    Return:
        A boolean indicating whether the operation succeeded
    """
    if data_type == "assignments":
        collection = db.assignments
        result = collection.update_one({"id": identifier}, {'$set': {"manual_status": True}})
    elif data_type == "announcements":
        collection = db.announcements
        result = collection.update_one({"id": identifier}, {'$set': {"mark_read": True}})
    else:
        return False

    if result.modified_count == 1:
        return True
    else:
        return False
