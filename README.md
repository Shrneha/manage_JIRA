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
<img width="1440" alt="Screenshot 2023-05-31 at 12 11 57 PM" src="https://github.com/Shrneha/manage_JIRA/assets/51981339/f02889e2-f7f9-400d-b198-980689138d36">


2. Change the status of the ticket from 'Open' to 'Close' with a comment in Jira using API.

<img width="1440" alt="Screenshot 2023-05-31 at 12 13 50 PM" src="https://github.com/Shrneha/manage_JIRA/assets/51981339/d8a65ec3-e2b9-4327-af8c-20131635691e">



3. After changing status, page reloads and we can see changed ticket status on board. Also there is refresh button provided on the screen. 

<img width="1440" alt="Screenshot 2023-05-31 at 12 15 17 PM" src="https://github.com/Shrneha/manage_JIRA/assets/51981339/ca2bb2f1-965d-48d9-9ab6-5fcf9f092554">



<h2>About the Stack</h2>

<h3>Backend</h3>

The ./backend directory contains a Flask and pymongo server. Primarily the app.py is used to define the endpoints and references models.py for DB and SQLAlchemy setup.

<h3>Frontend</h3>

The ./frontend directory contains a complete React frontend to consume the data from the Flask server.







