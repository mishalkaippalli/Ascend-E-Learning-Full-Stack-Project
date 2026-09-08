# Ascend E-Learning Platform

Ascend is a full-stack e-learning platform where students can learn and complete courses, instructors can create and manage courses, and administrators can manage the platform.

## Project Status

🚧 This project is currently under development.

## Tech Stack

### Frontend

- React.js
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- MongoDB
- Mongoose

### Authentication

- Argon2
- OTP-based email verification

## Architecture

The backend follows a layered architecture with:

- Repository Pattern
- SOLID Principles
- Object-Oriented Programming
- Dependency Injection

High-level request flow:

```text
Client
  ↓
Routes
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Model
  ↓
MongoDB
```

## User Roles

- **Student** — Learn and complete courses
- **Instructor** — Create and manage courses
- **Admin** — Manage the platform

## Project Structure

```text
Ascend E-Learning Project/
│
├── backend/
│   └── src/
│
├── frontend/
│
├── .gitignore
└── README.md
```

## Development

### Backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on:

```text
http://localhost:4000
```

## License

This project is currently developed for learning and portfolio purposes.