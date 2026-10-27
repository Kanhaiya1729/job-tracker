# JobTrack — Job Application Tracker

A full-stack job application tracking system that helps users manage, organize, and monitor their job search in one place.

## 🚀 Features

- User registration and login
- JWT-based authentication and protected routes
- Add, edit, and delete job applications
- Track application statuses: Applied, Interview, Rejected, Offer, and Withdrawn
- Search applications by company or position
- Filter applications by status
- Dashboard with application statistics
- Store job details, including company, position, location, job type, salary, application date, and job URL
- Responsive user interface built with React and Tailwind CSS
- RESTful API integration between frontend and backend

## 🛠️ Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- Tailwind CSS
- Vite
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Zod for request validation

### Tools
- Git & GitHub
- VS Code
- Postman
- Vercel

## 📁 Project Structure

```text
job-tracker/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- MongoDB instance or MongoDB Atlas account
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Kanhaiya1729/job-tracker.git
cd job-tracker
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and configure the required environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Use the exact variable names expected by your backend configuration.

Start the backend:

```bash
npm start
```

If your backend uses a different development script, check `backend/package.json`.

### 3. Configure the frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Configure the backend API URL in the frontend according to the settings used in `src/services/api.js`. For local development, it should point to your local backend API.

Start the frontend development server:

```bash
npm run dev
```

Vite will display the local URL in your terminal, usually `http://localhost:5173`.

## 🔐 Authentication

The application uses JSON Web Tokens (JWT) to authenticate users and protect API endpoints. Passwords are hashed before storage, and the frontend communicates with the backend through REST APIs.

## 🌐 Deployment

The frontend and backend can be deployed separately.

- **Frontend:** Vercel
- **Backend:** A Node.js-compatible hosting provider
- **Database:** MongoDB Atlas or another accessible MongoDB instance

Configure production environment variables and the deployed backend API URL before deploying. Never commit `.env` files or secrets to GitHub.

## 🔮 Future Improvements

- Job application reminders
- Resume and interview preparation tracking
- Advanced analytics and visualizations
- Export job application data
- Improved accessibility and mobile experience

## 👨‍💻 Author

**Kanhaiya Kumar Sahani**

- GitHub: [@Kanhaiya1729](https://github.com/Kanhaiya1729)

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.

