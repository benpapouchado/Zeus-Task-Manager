# Zeus Task Manager

 Welcome to Mount Olympus.

Task Manager web app where users can create, delete, view and update their tasks. Tasks include a title, a status, an optional description and a due date.

The backend is written in Springboot. I used the Java version 25 openJDK for this.

The frontend is written in React Vite. I used Typescript 

The database is Postgres

## Installation
1. Clone the repository
2. Start a terminal and `cd backend`
3. Start the backend server with `mvn spring-boot:run`
4. Start a new terminal and `cd frontend`
5. Run `npm install`
6. Start the frontend server with `npm run dev`

alternatively
Run the ./startup.sh

## Usage
Visit `http://localhost:5173/tasks` in your browser to use the application.

## Endpoints

GET /api/tasks/retrieve
retrieves all the tasks that have been created and are displayed in a listed table

GET /api/tasks/retreive/{id}
search function to retrieve a single task by its Id number

POST
/api/tasks/create
creates a new task and enters into database. Takes a body containing title, optionsl description, status and due date

PATCH
/api/tasks/update/{id}
updates the status of a task of the given options.

DELETE
/api/tasks/delete?ids=id1,id2,id3
Deletes single or multiple rows of tasks

### Test endpoints
 Run `curl -X -i "http://localhost:8080/api/tasks/retrieve"` to manually test the backend server is running display all the tasks

 ## Run tests

## Improvements
1. Containerise the frontend, backend and database,
2. Fix select bug
3. Allow archiving of tasks and undo of deleting
4. Introduce idempotency to the `api/tasks/create` endpoint as the HTTP method, POST, is not naturally idempotent.