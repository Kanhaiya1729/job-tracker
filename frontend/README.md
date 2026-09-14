# JobTrack Frontend

Frontend for a Job Application Tracking System built with:

- HTML5
- CSS3
- Bootstrap 5
- Vanilla JavaScript
- Fetch API

## Pages

- `index.html` - Landing page
- `signup.html` - Registration
- `login.html` - Login
- `dashboard.html` - Application dashboard
- `add-application.html` - Add application
- `edit-application.html` - Edit application

## JavaScript

- `api.js` - API helper and common alerts
- `auth.js` - Authentication helpers
- `login.js` - Login logic
- `signup.js` - Signup logic
- `dashboard.js` - Dashboard, search, filter, delete
- `add-application.js` - Create application
- `edit-application.js` - Update application

## Backend connection

By default the frontend expects the Express server at:

`http://localhost:5000/api`

Change `API_BASE_URL` in `js/api.js` if your backend uses another URL.

## Expected API

POST `/api/auth/signup`
POST `/api/auth/login`
GET `/api/auth/me`

POST `/api/applications`
GET `/api/applications`
GET `/api/applications/:id`
PUT `/api/applications/:id`
DELETE `/api/applications/:id`
GET `/api/applications/stats`

## Run

Use VS Code Live Server or another static HTTP server. Start the Express backend separately on port 5000.
