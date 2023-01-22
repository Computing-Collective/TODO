from canvasapi import Canvas
import dotenv
import os
import datetime
import sys
import time

dotenv.load_dotenv(dotenv.find_dotenv())

API_TOKEN = os.environ.get("CANVAS_API_TOKEN")
API_URL = "https://ubc.instructure.com"

sys.path.append('../')

from backend.database.models import Assignment, AnnouncementMessage, Course
from backend.database.queries import add_to_database


def canvas_api(include_assignment=True, include_announcement=True):
    """Fetches data from Canvas API and adds it to the database.

    Args:
        include_assignment (bool): whether to add assignments to the database. Defaults to True.
        include_announcement (bool): whether to add announcements to the database (also includes mail). Defaults to True.
    """
    
    start = time.time()
    canvas = Canvas(API_URL, API_TOKEN)
    end = time.time()
    print("setup time: ", end - start)

    user = canvas.get_current_user()
    courses = canvas.get_courses(enrollment_state="active")
    conversations = canvas.get_conversations()

    course_list = []  # A list of all the course objects
    course_id_nick = {}  # Key: course_id (int), Value: course_nickname (string)

    assignments_to_add = []
    announcements_to_add = []
    courses_to_add = []

    if include_assignment:
        start = time.time()
        for course in courses:
            t0 = time.time()
            course_list.append(course)
            course_name: str = canvas.get_course_nickname(course).nickname
            if course_name is None:
                course_name = course.name
            course_id_nick.update({course.id: course_name})
            course_code_arr = course.course_code.split(" ")
            if len(course_code_arr) > 1:
                courses_to_add.append(Course(course_code_arr[0] + " " + course_code_arr[1], course_name))
            assignments = course.get_assignments()
            for assignment in assignments:
                identifier = str(assignment.id)
                link: str = assignment.html_url
                title: str = assignment.name
                description: str = assignment.description
                if assignment.due_at is not None:
                    due_date: datetime.datetime = assignment.due_at_date
                else:
                    due_date = datetime.datetime.min
                if assignment.lock_at is not None:
                    lock_date: datetime.datetime = assignment.lock_at_date
                else:
                    lock_date = datetime.datetime.min
                # submission_dl_url:str = assignment.submission_download_url
                submission_status: bool = assignment.has_submitted_submissions
                assignments_to_add.append(
                    Assignment(identifier, course_name, link, due_date, lock_date, title, False, submission_status, description))
            t1 = time.time()
            print("--> for loop time: ", t1 - t0)

        
        end = time.time()
        print("for loop time: ", end - start)
        
        start = time.time()
        add_to_database(assignments_to_add, "assignments")
        add_to_database(courses_to_add, "courses")
        end = time.time()
        print("add to database time: ", end - start)
    
    if include_announcement:
        for course in courses:
            course_list.append(course)
            course_name: str = canvas.get_course_nickname(course).nickname
            if course_name is None:
                course_name = course.name
            course_id_nick.update({course.id: course_name})
        announcements = canvas.get_announcements(course_list)
        for announcement in announcements:
            identifier: str = "a" + str(announcement.id)
            link: str = announcement.html_url
            message: str = announcement.message
            posted_at: datetime.datetime = announcement.posted_at_date
            title: str = announcement.title
            poster: str = announcement.user_name
            course_name: str = course_id_nick.get(int(announcement.context_code.split('_')[1]))
            if announcement.read_state == "read":
                mark_read = True
            else:
                mark_read = False
            announcements_to_add.append(
                AnnouncementMessage(identifier, title, poster, course_name, link, message, posted_at, mark_read))

        for mail in conversations:
            identifier: str = "m" + str(mail.id)
            link: str = API_URL + "/conversations"
            message: str = mail.last_message  # message is truncated
            posted_at: datetime.datetime = mail.last_message_at_date
            title: str = mail.subject
            poster: str = mail.participants[0]["name"]
            course_name: str = course_id_nick.get(int(mail.context_code.split("_")[1]))
            if mail.workflow_state == "read":
                mark_read = True
            else:
                mark_read = False
            announcements_to_add.append(
                AnnouncementMessage(identifier, title, poster, course_name, link, message, posted_at, mark_read))

        add_to_database(announcements_to_add, "announcements")


if __name__ == "__main__":
    canvas_api()
