# ⚡ Zeus Task Manager

*Welcome to Mount Olympus.*

A task management web application where users can create, view, update and delete tasks.

Each task contains:
- A title
- A status
- An optional description
- A due date

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Prerequisites](#prerequisites)
3. [Database Configuration](#database-configuration)
4. [Get Zeus Task Manager up and running](#get-zeus-task-manager-up-and-running)
5. [Installation](#installation)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Testing](#testing)
9. [Future Improvements](#future-improvements)

## Tech Stack

| Layer | Technology |
| --- | --- | 
| Frontend | React, Vite, TypeScript |
| Backend | Java 25 (OpenJDK), Spring Boot |
| Database | PostgreSQL |
| Styling | Bulma CSS |

## Prerequisites

Before running the application, ensure you have installed:

- Java 25 (OpenJDK)
- Maven 
- Node.js and npm
- PostgreSQL

## Database Configuration

This application uses **PostgreSQL** as its database.

### 1. Install and Start PostgreSQL

Install PostgreSQL on your system and ensure that the PostgreSQL service is running.

Create or configure a PostgreSQL user named `taskmanager_user` with the necessary database permissions.

### 2. Create the Database

Create a database named `taskmanager_db`:

```sql
CREATE DATABASE taskmanager_db;
```

### 3. Configure Environment Variables

Configure the following environment variables in application.properties to connect the application to PostgreSQL:

| Variable | Description | Value |
| --- | --- | --- |
| `DB_URL` | PostgreSQL database connection URL | `jdbc:postgresql://localhost:5432/taskmanager_db` |
| `DB_USERNAME` | PostgreSQL username | `taskmanager_db` |
| `DB_PASSWORD` | PostgreSQL password | `your_password` |

Replace `your_password` with your actual PostgreSQL password.

**Note:** Ensure the configured PostgreSQL user has the necessary permissions to access `taskmanager_db`.


## Get Zeus Task Manager up and running

Ensure PostgreSQL is running and the database connection details are configured in the backend application settings.

### Installation

**1. Start the backend**

```bash
cd backend
mvn spring-boot:run
```

**2. Start the frontend**

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

## Usage

Once the frontend and backend servers are running, visit:

[http://localhost:5173/tasks](http://localhost:5173/tasks)

The application allows users to create, view, search, update and delete tasks.

Example:

## API Endpoints

The backend exposes the following REST API endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/tasks/retrieve` | Retrieves all tasks |
| GET | `/api/tasks/retrieve/{id}` | Retrieves a task by its ID |
| POST | `/api/tasks/create` | Creates a new task |
| PATCH | `/api/tasks/update/{id}` | Updates a task's status |
| DELETE | `/api/tasks/delete?ids=id1,id2,id3` | Deletes one or multiple tasks |

### Create Task

`POST /api/tasks/create`

Creates a new task and saves it to the database.

The request body contains:
- `title` – Task title
- `description` – Optional task description
- `status` – Task status
- `dueDate` – Task due date

### Update Task

`PATCH /api/tasks/update/{id}`

Updates the status of the task with the specified ID.

The request body contains:
- `status` – Updated Task status

## Testing

### Manually Testing the Backend

With the backend server running, use curl to check that the API is responding:

```bash
curl -i http://localhost:8080/api/tasks/hello
```

### Running Unit Tests

Navigate to the backend directory:

```bash
cd backend
```

Run all backend tests:

```bash
./mvnw test
```

## Future Improvements

- Containerise the frontend, backend and database using Docker.
- Deleting every task should disable the delete button
- Introduce task archiving and the ability to send tasks to deletion bin, which are fully deleted when the bin is emptied.
- Implement idempotency for the task creation endpoint to help prevent duplicate tasks from repeated tries of the same request.
- Complete the Dashboard, Calendar and Settings pages.
- Add frontend unit and component tests.
