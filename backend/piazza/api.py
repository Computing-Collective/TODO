from piazza_api import Piazza
import os
import dotenv
import time

dotenv.load_dotenv(dotenv.find_dotenv())

p = Piazza()
p.user_login(os.getenv("PIAZZA_USER"), os.getenv("PIAZZA_PW"))

classes: list = p.get_user_classes()

arg = "Winter Term 2 2023"  # Winter Term t yyyy
class_id_name_dict = {}  # str / str

for clas in classes:
    if clas["term"] == arg:
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
            original_post_name: str = user[0]["name"]
        else:
            original_post_name = "Anonymous"

        subject: str = post["history"][0]["subject"]
        # get course
        course_arr = name.split(" ")  # TODO: get course from database
        course_name = course_arr[0] + " " + course_arr[1]
        # get link
        post_num: int = post["nr"]
        link: str = f"https://piazza.com/class/{id}/post/{post_num}"
