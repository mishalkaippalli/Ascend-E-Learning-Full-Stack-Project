# Ascend — Interactive Digital Content Platform

Ascend is a full-stack platform designed to make reading and consuming digital books more engaging through interactive features, AI-powered assistance, and community discussions.

Readers can explore books, read chapters, track their progress, highlight important passages, take notes, ask questions about book content using AI, and participate in discussions.

Publishers can publish and manage books, while administrators oversee platform operations, content approval, and moderation.

**Read 📖 · Listen 🎧 · Watch 🎬 · Ask AI 🤖 · Discuss 💬**

## Project Status

🚧 **Currently under development.**

The MVP focuses on books, with an architecture designed to support additional content types in the future.

## Tech Stack

### Frontend
- React.js
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Zod

### Backend
- Node.js
- Express.js
- TypeScript
- Layered Architecture
- Repository Pattern
- Dependency Injection

### Database and Storage
- MongoDB
- Mongoose
- Redis — OTP storage

### Authentication and Security
- Argon2 — password hashing
- OTP-based email verification
- Access and refresh tokens
- Authentication and authorization middleware
- Input validation and centralized error handling

## Core Features

### Authentication and User Management
- User registration and email verification
- Login and token-based authentication
- Refresh token rotation and logout
- Forgot password and password reset
- Role-based access control

### Book Management
- Publisher registration and management
- Create, edit, and manage books
- Book metadata and author information
- Organize books into chapters
- Upload book covers, reading content, and supporting media
- Submit books for administrative approval

### Interactive Reading
- Read books chapter by chapter
- Track reading progress and resume where you left off
- Bookmark books and chapters
- Highlight important passages
- Add personal notes

### AI-Powered Book Assistant
- Ask questions about a book's content
- Get explanations of selected passages
- Generate chapter summaries
- Retrieve relevant information using Retrieval-Augmented Generation (RAG)

### Community Discussions
- Participate in book-level and chapter-level discussions
- Comment and reply to discussions
- Hide spoilers behind spoiler warnings
- Support discussion moderation

### Administration
- Manage users and publishers
- Review and approve submitted books
- Moderate discussions and reported content
- Manage platform settings

*Features are part of the planned MVP scope and are being implemented progressively.*

## User Roles

- **User** — Explore and read books, track progress, manage bookmarks and notes, interact with the AI assistant, and participate in discussions.
- **Publisher** — Create and manage books, organize chapters, upload content, and submit books for approval.
- **Admin** — Manage users and publishers, approve content, moderate discussions, and oversee the platform.

## Architecture

The backend follows a **Layered Architecture** with an emphasis on maintainability, separation of concerns, and testability.

Key principles and patterns:

- Repository Pattern
- SOLID Principles
- Object-Oriented Programming
- Dependency Injection
- DTOs (Data Transfer Objects)
- Separation of concerns

### High-Level Request Flow

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

The frontend and backend are maintained as separate applications.

## Project Structure

```text
Ascend/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── models/
│       ├── routes/
│       ├── middlewares/
│       ├── dtos/
│       ├── types/
│       ├── utils/
│       ├── config/
│       ├── app.ts
│       └── server.ts
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── schemas/
│       ├── types/
│       └── ...
│
├── .gitignore
└── README.md
```

*The directory structure above illustrates the intended organization; adjust it to match the actual files in the repository.*

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB
- Redis

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Ascend
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file using the project's environment variable template and configure the required settings, including the MongoDB connection, Redis connection, authentication secrets, and email service.

Start the development server:

```bash
npm run dev
```

The backend runs at:

```text
http://localhost:4000
```

### 3. Set Up the Frontend

Open a separate terminal:

```bash
cd frontend
npm install
```

Configure the frontend environment variables according to the project's environment template, then start the development server:

```bash
npm run dev
```

Use the local URL printed by Vite to access the application.

## Future Direction

Ascend's initial release focuses exclusively on books. The architecture may be extended in the future to support additional content types, such as articles and podcasts, without making them part of the current MVP.

## License

This project is currently developed for learning and portfolio purposes.
