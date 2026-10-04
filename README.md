# NexusBase

A modern Backend-as-a-Service (BaaS) platform built for the Group 47 capstone project.

NexusBase provides developers with tools for authentication, project management, database management, API key management, file storage, API usage monitoring, documentation, user profiles, project access, and settings.

## Project Stack

### Frontend

* React 19
* Vite
* JavaScript
* Tailwind CSS v4
* React Router
* Axios
* Context API
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* REST API

## Project Structure

```text
TS-group-47-capstone-project/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   ├── public/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validations/
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## Installation

Clone the repository and enter the project directory.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

Open another terminal:

```bash
cd backend
npm install
npm run dev
```

The frontend and backend run as separate applications during development.

## Frontend Environment Variables

Inside the `frontend` folder, create a `.env` file based on `.env.example`.

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Do not commit `.env` files to GitHub.

Only commit `.env.example` with placeholder values.

## Backend Environment Variables

Inside the `backend` folder, create a `.env` file based on `.env.example`.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

Never expose database credentials, JWT secrets, or other sensitive credentials in the frontend or GitHub repository.

## Backend Connection

The frontend communicates with the Express backend through Axios.

All frontend API requests should go through:

```text
frontend/src/services/api.js
```

The Axios client uses:

```env
VITE_API_BASE_URL
```

Feature-specific services should remain separate so each frontend feature can communicate with its corresponding backend module.

Examples:

```text
auth.service.js
project.service.js
database.service.js
apiKey.service.js
storage.service.js
usage.service.js
documentation.service.js
profile.service.js
access.service.js
settings.service.js
```

Authentication requests use JWT authentication.

Protected requests send:

```text
Authorization: Bearer <token>
```

The frontend should handle common backend responses including:

* 200 — Success
* 201 — Created
* 400 — Bad Request
* 401 — Unauthorized
* 403 — Forbidden
* 404 — Not Found
* 409 — Conflict
* 500 — Server Error

## Main Features

NexusBase contains the following major modules:

1. Authentication
2. API Key Management
3. Project Management
4. Database Service
5. Storage/File Management
6. API Usage and Analytics
7. Documentation/API Management
8. User/Profile Management
9. Project Access/Team Management
10. Settings/Configuration

Each module should remain modular and communicate with the backend through its dedicated service/API layer.

## Frontend Development

The frontend uses reusable React components for:

* Buttons
* Forms
* Cards
* Tables
* Modals
* Navigation
* Sidebar
* Search
* Filters
* Pagination
* Loading states
* Empty states
* Error states
* Toast notifications
* Confirmation dialogs

The dashboard may contain representative/demo data during development. Once the backend endpoints are available, replace demo data with responses from the appropriate API service.

## Backend Development

The backend follows a modular Express architecture.

```text
controllers/
services/
routes/
models/
middleware/
validations/
config/
utils/
```

Controllers handle HTTP requests, services contain business logic, models handle MongoDB data structures, routes define API endpoints, middleware handles authentication and other request processing, and validations handle incoming data validation.

## Build Frontend

From the frontend directory:

```bash
npm run build
```

The production build will be generated in:

```text
frontend/dist/
```

The `dist` directory should not be committed to GitHub.

## Git Workflow

Team members should work on feature branches rather than directly modifying `main`.

Example:

```bash
git checkout -b feature/frontend
```

After completing the feature:

```bash
git add .
git commit -m "feat: add frontend"
git push -u origin feature/frontend
```

Create a Pull Request on GitHub for review and merging.

## Important

Do not commit:

* `.env`
* `node_modules`
* `dist`
* build files
* API secrets
* MongoDB credentials
* JWT secrets

These files are excluded through the root `.gitignore`.

NexusBase is designed as a modular full-stack application so that the React frontend can connect cleanly to the existing Node.js/Express backend through REST APIs.
