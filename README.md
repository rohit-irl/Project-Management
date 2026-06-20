# Full Stack Task Management Web App

This repository contains a full stack task manager with a React frontend and Express backend.

## Project structure

- `frontend/` - React + Tailwind CSS application
- `backend/` - Node.js + Express + MongoDB API

## Getting Started

### Frontend

1. Open `frontend/`
2. Install dependencies: `npm install`
3. Start the React app: `npm run dev`

### Backend

1. Open `backend/`
2. Install dependencies: `npm install`
3. Create a `.env` file with `MONGODB_URI`
4. Start the server: `npm run dev`

## File overview

- `frontend/src/components/` — reusable UI components such as `TaskCard`, `Navbar`, `Loader`, and `EmptyState`
- `frontend/src/pages/` — top-level pages like `Dashboard` and `AddTask`
- `frontend/src/services/api.js` — Axios configuration and API call helpers
- `frontend/src/context/ThemeContext.js` — theme state management for dark mode
- `backend/routes/tasks.js` — task API routes
- `backend/controllers/taskController.js` — controller logic for task CRUD operations
- `backend/models/Task.js` — Mongoose schema for tasks
- `backend/config/db.js` — MongoDB connection setup
- `backend/server.js` — Express server entry point
