from piazza_api import Piazza
import os
import dotenv

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
    feed = course.iter_all_posts(limit=50)
    for post in feed:
        id: str = post["id"]  # post id
        folders: list = post["folders"]
        bucket_name: str = post["bucket_name"]  #
        created: str = post["created"]  # time created ISO 691? '2023-01-20T17:58:27Z'
        type_of_post: str = post["type"]  # question, note
        original_post_body: str = post["history"][0]["content"]  # in html format
        subject: str = post["history"][0]["subject"]
        course_name = name
