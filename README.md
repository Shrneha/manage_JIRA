<h1>Jira DashBoard </h1>

<h3>Goal: Manage Jira tickets using Python API</h3>


Prerequisite: Create a free Jira account and create a few sample tickets


<h4>Tasks: </h4>
Task 1: 
Fetch all tickets from Jira API with pagination and save that in the database table. You should save as many fields as you can in database but these are the minimum required.
Number, Name, Description, Reporter, Status, Due Date if any etc
<br></br>

Task 2: 
Change the status of the ticket from 'Open' to 'Close' with a comment in Jira using API.
<br></br>

Task 3: 
Create a UI to show the tickets from the database
<br></br>

Task 4: 
Add a button to re-fetch or re-load new tickets if any from Jira and put them into the database
<br></br>

<h2>Screen Shots:</h2>

1. Home Page

<img width="1440" alt="Screenshot 2023-05-25 at 5 24 30 PM" src="https://github.com/Shrneha/manage_JIRA/assets/51981339/93017def-dd3c-4d23-b725-b258b6fe0808">


2. Change the status of the ticket from 'Open' to 'Close' with a comment in Jira using API.

<img width="1438" alt="Screenshot 2023-05-25 at 5 28 57 PM" src="https://github.com/Shrneha/manage_JIRA/assets/51981339/fefc787f-4073-4a69-ba6c-df87b2a43f4c">


<img width="1440" alt="Screenshot 2023-05-25 at 5 34 33 PM" src="https://github.com/Shrneha/manage_JIRA/assets/51981339/94352c05-d516-4a54-83dd-254b8617f1ea">

3. After changing status, page reloads and we can see changed ticket status on board. 

<img width="1440" alt="Screenshot 2023-05-25 at 5 36 35 PM" src="https://github.com/Shrneha/manage_JIRA/assets/51981339/c2fa22d9-9e9c-4aa2-bca0-39bcb5cf0cf5">


<h2>About the Stack</h2>

<h3>Backend</h3>

The ./backend directory contains a Flask and pymongo server. Primarily the app.py is used to define the endpoints and references models.py for DB and SQLAlchemy setup.

<h3>Frontend</h3>

The ./frontend directory contains a complete React frontend to consume the data from the Flask server.







