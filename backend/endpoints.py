import json

from flask import Flask
from database.queries import *
import sys

sys.path.append('../')

from canvas.api import canvas_api
from piazza.api import piazza_api
from database.queries import new_assignments, new_announcements

app = Flask(__name__)


@app.route("/getnewassignment")
def get_new_assignment():
    """Returns new assignments since last retrieval
    # TODO: add more info
    """
    canvas_api(True, False)
    for item in new_assignments:
        if item['manual_status']:
            new_assignments.remove(item)
    return new_assignments


@app.route("/getnewannouncement")
def get_new_announcement():
    """Returns new announcements since last retrieval
    # TODO: add more info
    """
    canvas_api(False, True)
    piazza_api()
    for item in new_announcements:
        if item['manual_status']:
            new_announcements.remove(item)
    return new_announcements


@app.route("/getall")
def get_all():
    """Returns all data - assignments and announcements
    # TODO: add more info
    """
    return "getall"


@app.route("/markcomplete/<identifier>/<data_type>")
def mark_complete(identifier: str, data_type: str):
    """Marks an assignment or announcement as complete
    This would remove it from the active assignments/announcements list

    Args:
        identifier (str): id of the assignment or announcement
        data_type (str): one of assignment or announcement
    """
    return "markcomplete" + identifier + data_type


if __name__ == "__main__":
    app.run(port=8080)
