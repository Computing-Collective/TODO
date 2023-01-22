from canvasapi import Canvas
import dotenv
import os
import datetime
from database.models import Assignment, AnnouncementMessage
from database.queries import add_to_database

dotenv.load_dotenv(dotenv.find_dotenv())

API_TOKEN = os.environ.get("CANVAS_API_TOKEN")
API_URL = "https://ubc.instructure.com"

canvas = Canvas(API_URL, API_TOKEN)

# course = canvas.get_announcements(#course ids)
user = canvas.get_current_user()
courses = canvas.get_courses(enrollment_state="active")
conversations = canvas.get_conversations()
# upcoming = canvas.get_upcoming_events()
# calendar = canvas.get_epub_exports()

course_list = []
course_nick = {}
for course in courses:
    course_list.append(course)
    name: str = canvas.get_course_nickname(course).nickname
    if name == None:
        name = course.name
    course_nick.update({course.id: name})
    assignments = course.get_assignments()
    for assignment in assignments:
        link: str = assignment.html_url
        name: str = assignment.name
        description: str = assignment.description
        if assignment.due_at != None:
            due_date: datetime.datetime = assignment.due_at_date
        else:
            due_date = None
        if assignment.lock_at != None:
            lock_date: datetime.datetime = assignment.lock_at_date
        else:
            lock_date = None
        # submission_dl_url:str = assignment.submission_download_url
        submission_status: bool = assignment.has_submitted_submissions

    announcements = canvas.get_announcements(course_list)
    for announcement in announcements:
        identifier: str = "a" + str(announcement.id)
        link: str = announcement.html_url
        message: str = announcement.message
        posted_at: datetime.datetime = announcement.posted_at_date
        title: str = announcement.title
        poster: str = announcement.user_name
        course_name: str = course_nick.get(int(announcement.context_code.split('_')[1]))
        announcements_to_add.append(
            AnnouncementMessage(identifier, title, poster, course_name, link, message, posted_at))

    for mail in conversations:
        identifier: str = "m" + str(mail.id)
        link: str = API_URL + "/conversations"
        message: str = mail.last_message  # message is truncated
        posted_at: datetime.datetime = mail.last_message_at_date
        title: str = mail.subject
        poster: str = mail.participants[0]["name"]
        course_name: str = course_nick.get(int(mail.context_code.split("_")[1]))
        announcements_to_add.append(
            AnnouncementMessage(identifier, title, poster, course_name, link, message, posted_at))

    add_to_database(assignments_to_add, "assignments")


if __name__ == "__main__":
    canvas_api()
