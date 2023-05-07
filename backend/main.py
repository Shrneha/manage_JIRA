import requests
import json
from creds import *
from flask import Flask, jsonify, request, json
from flask_cors import CORS
import pymongo
from requests.auth import HTTPBasicAuth
import sys

app = Flask(__name__)


try:
    conn_url = DB_CONNECTION_URL
    client = pymongo.MongoClient(conn_url)
    print("connected to mongodb")
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
    print("existing collection is deleted")
    # return a friendly error if an authentication error is thrown
except pymongo.errors.OperationFailure:
    print("An authentication error was received. Are your username and password correct in your connection string?")
    sys.exit(1)


def jira_authentication():
    """
    Ensures Jira authentication
    """

    headers = {
        "Accept": "application/json",
    }
    #try:
    # Authenticate JIRA API and fetch required data
    auth = HTTPBasicAuth(username, jira_API_token)
    response = requests.request(
        "GET",
        jira_project_board_url,
        headers=headers,
        auth=auth
    )
    return response
    # except error as e:
    #     print("Jira authentication error")

@app.route('/')
def helloworld():
    return "Hello World !"


# API to generate reports
@app.route('/fetch_issues', methods=['POST', 'GET'])
def consumption_reports():
    """
        Fetches issues latest issues from project board
    """

    # Authenticate jira and fetch API data
    response = jira_authentication()
    data = json.loads(response.text)
    issues = data["issues"]

    for each_issue in range(len(issues)):

        # assign variables
        issues = data["issues"][each_issue]["fields"]["summary"]
        number = data["issues"][each_issue]["key"]
        description_field = data["issues"][each_issue]["fields"]["description"]
        description = data["issues"][each_issue]["fields"]["description"]["content"][0]["content"][0]["text"] if description_field is not None else None
        reporter = data["issues"][each_issue]["fields"]["reporter"]["displayName"]
        status = data["issues"][each_issue]["fields"]["status"]["name"]
        due_date = data["issues"][each_issue]["fields"]["duedate"]
        story_points = data["issues"][each_issue]["fields"]["customfield_10016"]

        # Insert each record to mongodb collection
        my_collection.insert_one(
            {
                'issues': issues,
                'number': number,
                'description': description,
                'reporter': reporter,
                'status': status,
                'due_date': due_date,
                'story_points': story_points
             }
        )

    return data


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
