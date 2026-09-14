# JobTrack Backend

Backend API for the JobTrack frontend.

## Stack

Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Zod, CORS, dotenv.

## Folder structure

```text
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── applicationController.js
│   └── authController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── validate.js
├── models/
│   ├── JobApplication.js
│   └── User.js
├── routes/
│   ├── applicationRoutes.js
│   └── authRoutes.js
├── validators/
│   ├── applicationValidator.js
│   └── authValidator.js
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## Setup

```bash
npm install
```

Copy `.env.example` to `.env`, then set your MongoDB connection and JWT secret.

Start development server:

```bash
npm run dev
```

Or:

```bash
npm start
```

The frontend expects:

```text
http://localhost:5000/api
```

## API

### Auth

```text
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

### Applications

```text
POST   /api/applications
GET    /api/applications
GET    /api/applications/stats
GET    /api/applications/:id
PUT    /api/applications/:id
DELETE /api/applications/:id
```

Application endpoints require:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## MongoDB

For local MongoDB:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/jobtrack
```

For MongoDB Atlas, replace it with your Atlas connection string.

## Important

Never commit `.env` to GitHub. `.gitignore` already excludes it.
