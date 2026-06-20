# Mini Project Management Portal

A full-stack task management web application built with React, Node.js, Express, and MongoDB.

## Features

- View all tasks on a responsive dashboard
- Create tasks with title, description, and status
- Mark tasks as completed
- Delete tasks
- Filter tasks by status (All, Pending, In Progress, Completed)
- Dark mode toggle
- Loading states and empty states
- Form validation (client and server)

## Project Structure

```
project-root/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── context/
└── backend/
    ├── routes/
    ├── controllers/
    ├── models/
    └── config/
```

## Setup Steps

### Prerequisites

- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas connection string

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Project-Management
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The API runs at `http://localhost:5000`.

### 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The app runs at `http://localhost:5173`.

## Assumptions

- MongoDB is used instead of MySQL for faster development with Mongoose.
- Task IDs use MongoDB `_id` instead of integer IDs.
- `created_at` is mapped from Mongoose `createdAt` timestamps.
- New tasks can only be created with status `Pending` or `In Progress`; `Completed` is set via the Complete action.
- The frontend uses view-based navigation instead of React Router for simplicity.
- Default MongoDB URI is `mongodb://127.0.0.1:27017/task-manager` if `.env` is not configured.

## API Documentation

Base URL: `http://localhost:5000`

### GET /tasks

Returns all tasks, sorted by newest first.

Optional query parameter:

| Parameter | Type   | Description                                      |
|-----------|--------|--------------------------------------------------|
| status    | string | Filter by status: Pending, In Progress, Completed |

**Response:** `200 OK`

```json
[
  {
    "_id": "665a1b2c3d4e5f6789012345",
    "title": "Build Login Page",
    "description": "Create a responsive login page with validation",
    "status": "Pending",
    "createdAt": "2026-06-20T10:30:00.000Z",
    "updatedAt": "2026-06-20T10:30:00.000Z"
  }
]
```

### POST /tasks

Create a new task.

**Request body:**

```json
{
  "title": "Build Login Page",
  "description": "Create a responsive login page with validation",
  "status": "Pending"
}
```

**Validation:**

- `title` — required
- `description` — required, minimum 20 characters
- `status` — optional, must be Pending, In Progress, or Completed (defaults to Pending)

**Response:** `201 Created`

### PUT /tasks/:id

Update task status.

**Request body:**

```json
{
  "status": "Completed"
}
```

**Response:** `200 OK` with updated task, or `404 Not Found`

### DELETE /tasks/:id

Delete a task.

**Response:** `200 OK`

```json
{
  "message": "Task deleted successfully"
}
```

## Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Frontend | React, Vite, Tailwind CSS, Axios |
| Backend  | Node.js, Express        |
| Database | MongoDB, Mongoose       |

## Scripts

| Command           | Location  | Description              |
|-------------------|-----------|--------------------------|
| `npm run dev`     | frontend  | Start Vite dev server    |
| `npm run build`   | frontend  | Production build         |
| `npm run dev`     | backend   | Start API with hot reload|
| `npm start`       | backend   | Start API server         |
