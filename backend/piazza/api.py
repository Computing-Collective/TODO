from piazza_api import Piazza
import os
import dotenv
import datetime

from database.models import (
    Assignment,
    AnnouncementMessage,
    DiscussionPost,
)  # TODO: add discussions
from database.queries import add_to_database

dotenv.load_dotenv(dotenv.find_dotenv())

p = Piazza()
p.user_login(os.getenv("PIAZZA_USER"), os.getenv("PIAZZA_PW"))


def piazza(term="Winter Term 2 2023"):
    """
    gets data from piazza and posts it to the database. the term must be in form: "Winter Term {t} {yyyy}"
    this will get all the data from winter term 2 2023 for example
    """
    classes: list = p.get_user_classes()

    class_id_name_dict = {}  # str / str
    announcements_to_add = []
    discussions_to_add = []

    for clas in classes:
        if clas["term"] == term:
            class_id_name_dict.update({clas["nid"]: clas["num"]})

    for id, name in class_id_name_dict.items():
        course = p.network(id)
        feed = course.iter_all_posts(limit=10)
        for post in feed:
            # announcement or no?
            instructor_note: bool = "instructor-note" in post["tags"]
            # unique id
            post_id: str = "p" + post["id"]  # post id
            # created time
            created: str = post[
                "created"
            ]  # time created ISO 691? '2023-01-20T17:58:27Z' as a **string**
            original_post_body: str = post["history"][0]["content"]  # in html format
            post_id = post["change_log"][0]["data"]

            # get post name
            if post["history"][0]["anon"] == "no":
                user_id = post["history"][0]["uid"]
                user = course.get_users([user_id])
                original_poster: str = user[0]["name"]
            else:
                original_poster = "Anonymous"

            # type of message
            msg_type: str = post["type"]

            subject: str = post["history"][0]["subject"]
            # get course
            course_arr = name.split(" ")  # TODO: get course from database
            course_name = course_arr[0] + " " + course_arr[1]
            # get link
            post_num: int = post["nr"]
            link: str = f"https://piazza.com/class/{id}/post/{post_num}"

            # store into classes
            if instructor_note:
                announcements_to_add.append(
                    AnnouncementMessage(
                        identifier=post_id,
                        title=subject,
                        poster=original_poster,
                        course_name=course_name,
                        link=link,
                        post_date=datetime.fromisoformat(created),
                        message=original_post_body,
                    )
                )
            else:
                discussions_to_add.append(
                    DiscussionPost(
                        identifier=post_id,
                        poster_name=original_poster,
                        title=subject,
                        type=msg_type,
                        description=original_post_body,
                        post_date=datetime.fromisoformat(created),
                    )
                )

    add_to_database(announcements_to_add, "announcements")
    # add_to_database(discussions_to_add, "discussions")
