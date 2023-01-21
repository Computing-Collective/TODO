from piazza_api import Piazza
import os
import dotenv

dotenv.load_dotenv(dotenv.find_dotenv())

p = Piazza()
p.user_login(os.getenv("PIAZZA_USER"), os.getenv("PIAZZA_PW"))

user_profile = p.get_user_profile()
classes: dict = user_profile["all_classes"]
arg = "Winter Term 2 2023"  # Winter Term t yyyy
class_id_list = []

for key, value in classes.items():
    if value["term"] == arg:
        class_id_list.append(key)

for id in class_id_list:
    p.network(id)
cpen221 = p.network("l7m075nny2la9")
cpen211 = p.network("l7ggtksfq994ji")
ece = p.network("kbi9wbpmc9h20")
math253 = p.network("l7du1zowwbi2t3")

p.request()
