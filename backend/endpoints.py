from flask import Flask
from database.queries import *

app = Flask(__name__)

@app.route("/getnewassignment")
def getNewAssignment():
    return "getnewassignment"

@app.route("/getnewannouncement")
def getNewAnnouncement():
    return "getnewannouncement"

@app.route("/getall")
def getAll():
    return "getall"

@app.route("/markcomplete/<id>/<type>")
def markComplete(id, type):
    return ("markcomplete" + id + type)
