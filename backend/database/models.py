from datetime import datetime


class Course:
    def __init__(self, course_name: str, nickname: str):
        self.course_name = course_name
        self.nickname = nickname


class Assignment:
    def __init__(self, identifier: str, course_name: str, link: str, due_date: datetime, lock_date: datetime,
                 title: str,
                 manual_status: bool, canvas_status: bool, description: str):
        self.id = identifier
        self.course_name = course_name
        self.link = link
        self.due_date = due_date
        self.lock_date = lock_date
        self.title = title
        self.manual_status = manual_status
        self.canvas_status = canvas_status
        self.description = description


class AnnouncementMessage:
    def __init__(self, identifier: str, title: str, poster_name: str, course: str, link: str, message: str,
                 post_date: datetime, mark_read: bool):
        self.id = identifier
        self.title = title
        self.poster_name = poster_name
        self.course = course
        self.link = link
        self.message = message
        self.post_date = post_date
        self.mark_read = mark_read


class DiscussionPost:
    def __init__(self, identifier: str, poster_name: str, title: str, post_type: str, description: str,
                 post_date: datetime):
        self.id = identifier
        self.poster_name = poster_name
        self.title = title
        self.type = post_type
        self.description = description
        self.post_date = post_date
