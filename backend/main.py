import requests
import json
from creds import *
from flask import Flask, request, json
from flask_cors import CORS
import pymongo
from requests.auth import HTTPBasicAuth
import sys
from bson.json_util import dumps


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


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
def get_issues():
    """
        Fetches issues latest issues from project board
    """
    try:
        conn_url = DB_CONNECTION_URL
        client = pymongo.MongoClient(conn_url)
        print("connected to mongodb")
    except pymongo.errors.ConfigurationError as e:
        print("An Invalid URI host error was received. Is your Atlas host name correct in your connection string?")
        sys.exit(1)

    # use a database named "myDatabase"
    db = client.myDatabase

    # use a collection name Tickets
    my_collection = db["Tickets"]

    # drop the collection in case it already exists
    try:
        my_collection.drop()
        print("existing collection is deleted")
        # return a friendly error if an authentication error is thrown
    except pymongo.errors.OperationFailure:
        print("An authentication error was received. Are your username and password correct in your connection string?")
        sys.exit(1)

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

    # final_data = list()

    # Fetch to do status data from mongodb in json format and convert cursor into list
    cursor = my_collection.find({})
    todo_list = list(cursor)
    todo_data = json.loads(dumps(todo_list, indent=2))
    # final_data.append(todo_data)

    # # Fetch In Progress status data from mongodb in json format
    # cursor = my_collection.find({"status": "In Progress"})
    # progress_list = list(cursor)
    # progress_data = {"key": "In Progress", "data": json.loads(dumps(progress_list, indent=2))}
    # final_data.append(progress_data)
    #
    # # Fetch Done status data from mongodb in json format
    # cursor = my_collection.find({"status": "Done"})
    # done_list = list(cursor)
    # done_data = {"key": "Done", "data": json.loads(dumps(done_list, indent=2))}
    # final_data.append(done_data)

    return todo_data


# API to update status with comment
@app.route('/update_status', methods=['POST','GET'])
def update_status():
    """
        Updates status of tickets from project board
        Adds comments
    """

    # fetch data from frontend
    comment = request.json["comment"]
    ticket_number = request.json["number"]
    status_id = request.json["id"]

    # Create status update and comment URL
    status_url = STATUS_UPDT_URL.replace("TICKET_NUMBER", ticket_number)
    comment_url = COMMENT_UPDT_URL.replace("TICKET_NUMBER", ticket_number)

    # Define payload
    """
        Status ID 11 - To Do
        Status ID 21 - In Progress
        Status ID 31 - Done
    """
    status_payload = json.dumps(
        {
            "transition": {
                "id": status_id
            }
        }
    )

    comment_payload = json.dumps(
        {
            "body": {
                "content": [
                    {
                        "content": [
                            {
                                "text": comment,
                                "type": "text"
                            }
                        ],
                        "type": "paragraph"
                    }
                ],
                "type": "doc",
                "version": 1
            }
        }
    )

    # update response
    auth = HTTPBasicAuth(username, jira_API_token)

    response = requests.request(
        "POST",
        status_url,
        data=status_payload,
        headers=headers,
        auth=auth
    )

    # Send appropriate response
    if not response:
        data = json.loads(response.text)
    else:
        data = {"Status": 204}

    # Post comment
    comment_response = requests.request(
        "POST",
        comment_url,
        data=comment_payload,
        headers=headers,
        auth=auth
    )
    comment_details = json.loads(comment_response.text)

    # Add comment details response to status response
    data.update(comment_details)

    return data


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
