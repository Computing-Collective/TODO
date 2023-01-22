import flask
from bson import json_util
from flask import Flask
import sys
import json

sys.path.append('../')

from backend.canvas.api import canvas_api
from backend.piazza.api import piazza_api
from backend.database.queries import get_from_database, mark_complete_database, new_assignments, new_announcements

app = Flask(__name__)


@app.route("/api/new-assignments")
def get_new_assignment():
    """Returns new assignments since last retrieval
    # TODO: add more info
    """
    canvas_api(True, False)
    for item in new_assignments:
        if item['manual_status']:
            new_assignments.remove(item)
    return json.loads(json_util.dumps(new_assignments))


@app.route("/api/new-announcements")
def get_new_announcement():
    """Returns new announcements since last retrieval
    # TODO: add more info
    """
    canvas_api(False, True)
    piazza_api()
    for item in new_announcements:
        if item['mark_read']:
            new_announcements.remove(item)
    return json.loads(json_util.dumps(new_announcements))


@app.route("/api/get-all")
def get_all():
    """Returns all data - assignments and announcements
    # TODO: add more info
    """
    canvas_api()
    piazza_api()
    return json.loads(json_util.dumps(get_from_database()))


@app.route("/api/mark-complete/<data_type>/<identifier>")
def mark_complete(identifier: str, data_type: str):
    """Marks an assignment or announcement as complete
    This would remove it from the active assignments/announcements list

    Args:
        identifier (str): id of the assignment or announcement
        data_type (str): one of assignment or announcement
    """
    return json.dumps(mark_complete_database(identifier, data_type))


if __name__ == "__main__":
    app.run(port=8080)
