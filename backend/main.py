import requests
import json
from creds import *
from flask import Flask, jsonify, request, json
from flask_cors import CORS
import pymongo
from requests.auth import HTTPBasicAuth
import sys



app = Flask(__name__)
#app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
try:
    conn_url = "mongodb+srv://shraddhabhuran31:w4EgJHtVCTp8nyed@jiradata.zqvrr78.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(conn_url)
except pymongo.error.ConfigurationError as e:
    print("An Invalid URI host error was received. Is your Atlas host name correct in your connection string?")
    sys.exit(1)

# use a database named "myDatabase"
db = client.myDatabase

# use a collection named "recipes"
my_collection = db["Tickets"]

# drop the collection in case it already exists
try:
    my_collection.drop()

    # return a friendly error if an authentication error is thrown
except pymongo.errors.OperationFailure:
    print("An authentication error was received. Are your username and password correct in your connection string?")
    sys.exit(1)



@app.route('/')
def helloworld():
    return "Hello World !"


# API to generate reports
@app.route('/fetch_issues', methods=['POST', 'GET'])
def consumption_reports():
    """
        Fetches issues latest issues from project board
    """


    headers={
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    # Authenticate JIRA API and fetch required data
    auth = HTTPBasicAuth(username, jira_API_token)
    response=requests.request(
        "GET",
        jira_project_board_url,
        headers=headers,
        auth=auth
    )
    data = json.loads(response.text)
    issues = data["issues"]

    # Create list of issues from dashboard
    summary_list = []
    for each_issue in range(len(issues)):
        my_collection.insert_one(
            {'issues': data["issues"][each_issue]["fields"]["summary"],
             'number': data["issues"][each_issue]["key"],
             'description': data["issues"][each_issue]["fields"]["description"],
             'reporter': data["issues"][each_issue]["fields"]["reporter"]["displayName"],
             'status': data["issues"][each_issue]["fields"]["reporter"]
             })
        summary_list.append(data["issues"][each_issue]["fields"]["status"]["name"])

    return data


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
