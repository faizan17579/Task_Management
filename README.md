Task Management Application

A full-stack task management application built with React (frontend) and Node.js/Express (backend). This project allows users to register, log in, create, edit, delete, and toggle the completion status of tasks.

Project Description
- **Frontend**: Built with Vite and React, featuring a responsive dashboard to manage tasks.
- **Backend**: RESTful API with Express, MongoDB for data storage, and JWT for authentication.
- **Features**: User authentication, task CRUD operations, and task completion toggling.

Setup Instructions
 Prerequisites
- Node.js (v16 or later)
- MongoDB (local or remote instance)
- Git

Environment Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/faizan17579/Task_Management.git
   cd task-management-app

Install dependencies for both frontend and backend:
bash
cd backend && npm install
cd ../frontend && npm install

Create .env files in both backend/ and frontend/ directories using the sample .env files provided below.
Start the MongoDB server (e.g., mongod for local setup).
Run the backend server:
bash

cd backend
node server.js
Run the frontend development server:
bash




cd ../frontend
npm run dev
Open http://localhost:5173 in your browser to view the app.
Sample .env Files
Backend .env
The backend .env file contains environment variables required to configure the server, database, and authentication. Below is a detailed breakdown:

PORT=5000
Description: The port number on which the backend server will run. Default is 5000, but you can change it to any available port (e.g., 3000).
Example: PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskdb
Description: The connection string for your MongoDB instance. Replace localhost:27017/taskdb with your MongoDB host and database name. For a remote MongoDB (e.g., MongoDB Atlas), use the provided connection string (e.g., mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskdb?retryWrites=true&w=majority).
Example: MONGODB_URI=mongodb://localhost:27017/taskdb
Note: Ensure MongoDB is running locally or the remote instance is accessible.
JWT_SECRET=your-secure-jwt-secret
Description: A secret key used to sign and verify JSON Web Tokens (JWT) for authentication. This should be a long, random string for security. Generate one using a tool like openssl rand -base64 32 or a password generator.
Example: JWT_SECRET=your-secure-jwt-secret
Note: Never commit this value to version control; keep it in the .env file.
Sample Backend .env File:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskdb
JWT_SECRET=your-secure-jwt-secret
Frontend .env
The frontend .env file configures the API endpoint for communication with the backend.

VITE_API_URL=http://localhost:5000
Description: The base URL of the backend API. This should match the PORT value in the backend .env file. If the backend runs on a different port or domain (e.g., during production), update this accordingly.
Example: VITE_API_URL=http://localhost:5000
Note: The VITE_ prefix is required for Vite to recognize environment variables. Ensure this matches your backend's address during development.
Sample Frontend .env File:

VITE_API_URL=http://localhost:5000
Dependencies


Backend package.json




{
  "name": "backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.0.0",
    "express-validator": "^6.14.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }
}
Frontend package.json




{
  "name": "frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.3.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^4.0.0"
  }
}