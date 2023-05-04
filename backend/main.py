import requests
import json
from creds import *
# jira_API_token, jira_project_board_url
from flask import Flask, jsonify, request, json
from flask_cors import CORS
from requests.auth import HTTPBasicAuth



app = Flask(__name__)



@app.route('/')
def helloworld():
    return "Hello World !"


# API to generate reports
@app.route('/fetch_issues', methods=['POST', 'GET'])
def consumption_reports():
    """Shows basic usage of the Sheets API.
    Print values from a sample spreadsheet.
    """


    headers={
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    query = {
        'jql': 'project=TTS'
    }
    auth = HTTPBasicAuth(username, jira_API_token)

    response=requests.request(
        "GET",
        jira_project_board_url,
        headers=headers,
        auth=auth
    )
    data = json.loads(response.text)
    print(type(data))
    return(data["issues"][0]["fields"]["summary"])


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True, threaded=True)


