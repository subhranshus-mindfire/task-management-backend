# Taskify Backend

Taskify is a collaborative task and project management system. This repository contains the **backend** code, built using **Node.js**, **Express**, **MongoDB**, and **TypeScript**.

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **TypeScript**
- **JWT Authentication**
- **REST API**
- **CORS & Helmet** for security
- **Cookie-based Auth** for production
- **Vitest** for testing

## 📁 Folder Structure

```
/src
  ├── controllers
  ├── models
  ├── routes
  ├── middleware
  ├── utils
  ├── services
  ├── tests
  └── index.ts
```

## 🔐 Authentication

- Register/Login with JWT tokens (access + refresh)
- Secure cookies in production (`httpOnly`, `sameSite`, `secure`)
- Protected routes using `authMiddleware`

## 🚀 API Endpoints

```
POST    /api/auth/register
POST    /api/auth/login
GET     /api/auth/me
POST    /api/auth/logout

GET     /api/projects
GET     /api/projects/by/:userId
POST    /api/projects
PATCH   /api/projects/:id
DELETE  /api/projects/:id

GET     /api/tasks/project/:projectId
POST    /api/tasks
PATCH   /api/tasks/:id/status
DELETE  /api/tasks/:id

GET     /api/notifications
PATCH   /api/notifications/:id/read
```

## ✅ Running Locally

```bash
git clone https://github.com/your-username/taskify-backend.git
cd taskify-backend
npm install
npm run dev
```

## 🧪 Run Tests

```bash
npm run test
```

## 🌐 Environment Variables

Create a `.env` file with the following:

```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
DEPLOYED_FRONTEND_URL=https://yourfrontend.vercel.app
NODE_ENV=development
```

## 📦 Deployment Notes

- Enable HTTPS (if in production)
- Ensure secure cookies are properly set
- Add CORS origin matching your frontend domain

---

🗓️ Last updated: 2025-08-05
