# NGO Backend API Documentation & Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation & Setup](#installation--setup)
3. [Environment Variables](#environment-variables)
4. [Running the Server](#running-the-server)
5. [API Endpoints & Sample Responses](#api-endpoints--sample-responses)

---

## Prerequisites
- Node.js installed (v16+)
- MongoDB Atlas account or local MongoDB server running

## Installation & Setup
1. Open your terminal and navigate to the `server` directory.
2. Run the following command to install dependencies:
```bash
npm install
```

## Environment Variables
Create a `.env` file in the `server` directory (an example has been provided). Configure the variables based on your setup.
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ngo_db
JWT_SECRET=YOUR_VERY_SECRET_KEY_HERE
```

## Running the Server
You can run the server in two modes:

**Development Mode** (uses nodemon to auto-restart on changes):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

You should see output indicating that the server is running and MongoDB is connected.

---

## API Endpoints & Sample Responses

### 1. Contact API
**Route:** `POST /api/contact`
**Description:** Submit a contact/inquiry message.

**Sample Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "message": "I would like to know more about your education programs."
}
```

**Sample Response:**
```json
{
  "success": true,
  "data": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "9876543210",
    "message": "I would like to know more about your education programs.",
    "_id": "64facf8d7ab83c1d9b301abc",
    "createdAt": "2026-03-09T14:30:00.000Z",
    "updatedAt": "2026-03-09T14:30:00.000Z",
    "__v": 0
  },
  "message": "Message sent successfully"
}
```

---

### 2. Volunteer Registration API
**Route:** `POST /api/volunteer`
**Description:** Register an applicant as a volunteer.

**Sample Request Body:**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "phone": "1234567890",
  "city": "Mumbai",
  "skills": "Teaching, Content Writing",
  "availability": "Weekends",
  "message": "Excited to contribute!"
}
```

**Sample Response:**
```json
{
  "success": true,
  "data": {
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "phone": "1234567890",
    "city": "Mumbai",
    "skills": "Teaching, Content Writing",
    "availability": "Weekends",
    "message": "Excited to contribute!",
    "_id": "64fad02c7ab83c1d9b301abd",
    "createdAt": "2026-03-09T14:35:00.000Z",
    "updatedAt": "2026-03-09T14:35:00.000Z",
    "__v": 0
  },
  "message": "Volunteer application submitted successfully"
}
```

---

### 3. Newsletter Subscription API
**Route:** `POST /api/newsletter`
**Description:** Subscribe a user to the newsletter (prevents duplicates).

**Sample Request Body:**
```json
{
  "email": "newsfan@example.com"
}
```

**Sample Response:**
```json
{
  "success": true,
  "data": {
    "email": "newsfan@example.com",
    "_id": "64fad0417ab83c1d9b301abe",
    "createdAt": "2026-03-09T14:40:00.000Z",
    "updatedAt": "2026-03-09T14:40:00.000Z",
    "__v": 0
  },
  "message": "Subscribed to newsletter successfully"
}
```

---

### 4. Donation Intent API
**Route:** `POST /api/donate`
**Description:** Records a donation intent (does not process payment).

**Sample Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alicej@example.com",
  "phone": "1122334455",
  "donationAmount": 5000,
  "donationPurpose": "Child Education",
  "paymentMethod": "UPI",
  "message": "Keep up the good work!"
}
```

**Sample Response:**
```json
{
  "success": true,
  "data": {
    "name": "Alice Johnson",
    "email": "alicej@example.com",
    "phone": "1122334455",
    "donationAmount": 5000,
    "donationPurpose": "Child Education",
    "paymentMethod": "UPI",
    "message": "Keep up the good work!",
    "_id": "64fad0927ab83c1d9b301abf",
    "createdAt": "2026-03-09T14:45:00.000Z",
    "updatedAt": "2026-03-09T14:45:00.000Z",
    "__v": 0
  },
  "message": "Donation intent recorded successfully"
}
```

---

### 5. Blogs API
**Route:** `GET /api/blogs`
**Description:** Get a list of all blogs.

**Sample Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "64fad10f7ab83c1d9b301ac1",
      "title": "Supporting Children's Education",
      "content": "Education is the most powerful weapon...",
      "author": "Admin",
      "image": "https://example.com/blog-image.jpg",
      "createdAt": "2026-03-09T14:50:00.000Z",
      "updatedAt": "2026-03-09T14:50:00.000Z",
      "__v": 0
    }
  ]
}
```

---

### 6. Events API
**Route:** `GET /api/events`
**Description:** Fetch upcoming NGO events.

**Sample Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "64fad1357ab83c1d9b301ac2",
      "title": "Annual Blood Donation Camp",
      "description": "Join us to save lives.",
      "location": "City Hall, Pune",
      "date": "2026-04-10T10:00:00.000Z",
      "image": "https://example.com/event-hero.jpg",
      "createdAt": "2026-03-09T14:55:00.000Z",
      "updatedAt": "2026-03-09T14:55:00.000Z",
      "__v": 0
    }
  ]
}
```

---

### 7. Impact Statistics API
**Route:** `GET /api/impact`
**Description:** Returns dynamic statistics used on the homepage.

**Sample Response:**
```json
{
  "success": true,
  "data": {
    "childrenEducated": 5200,
    "mealsServed": 10500,
    "volunteersJoined": 125,
    "healthCamps": 45
  }
}
```

---

### 8. Admin Login API
**Route:** `POST /api/admin/login`
**Description:** Authenticates admin and returns a JWT token.

**Sample Request Body:**
```json
{
  "username": "admin",
  "password": "mySecurePassword123"
}
```

**Sample Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64facf007ab83c1d9b301ab1",
    "username": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```
*Note: Include this token in the header as `Authorization: Bearer <token>` for protected routes like creating blogs or events.*

I have finished generating the complete backend architecture for your NGO website!

Here is a breakdown of what has been implemented based on your requirements:

1. Project Initialization & Setup
Initialized a Node.js project and installed required dependencies: express, mongoose, dotenv, cors, helmet, express-rate-limit, express-mongo-sanitize, jsonwebtoken, bcryptjs, and xss-clean.
Configured a neat MVC (Model-View-Controller) structure, creating folders for /models, /controllers, /routes, and /middlewares.
Created an 

server.js
 file housing basic configuration, routing integration, body parsers, and important security middlewares.
Updated the 

package.json
 to include "dev": "nodemon server.js" and "start": "node server.js" command scripts.
2. Mongoose Models (/models/)
Generated dynamic database schemas supporting timestamps 

(createdAt, updatedAt)
 for:


Contact.js
: name, email, phone, message

Volunteer.js
: name, email, phone, city, skills, availability, message

Newsletter.js
: Stores unique email addresses

Donation.js
: name, email, phone, donationAmount, donationPurpose, paymentMethod: ['UPI', 'Bank Transfer'], message

Blog.js
: title, content, author, image

Event.js
: title, description, location, 

date
, image

Gallery.js
: image, caption, category

Admin.js
: Enforces a hashed password storing mechanism checking bcrypt hashes.

3. API Controllers & Logic (/controllers/)
Implemented reusable logic separated explicitly per functional domain (contactController, donationController, volunteerController, blogController, eventController, galleryController, impactController, and adminController).

These controllers validate the incoming JSON bodies, handle document insertion/updates, and consistently return sanitized RESTful JSON payloads. For instance, the impactController returns dynamic volunteer counts alongside formatted metrics.

4. Express Routes (/routes/)
Registered clear, individual endpoint paths connecting HTTP methods to respective controller methods:

POST /api/contact
POST /api/volunteer
POST /api/newsletter
POST /api/donate
GET, POST, PUT, DELETE for /api/blogs
GET, POST, PUT, DELETE for /api/events
GET, POST, DELETE for /api/gallery
GET /api/impact
POST /api/admin/login
Protected API manipulation commands (like generic POST /api/events or DELETE /api/blogs/:id) are shielded by custom JWT user token verification through 

authMiddleware.js
.

5. Configs, Environments & Middleware
Created the 

/config/db.js
 which holds the generic connection resolver mechanism pointing correctly to Mongo clusters.
Added 

errorMiddleware.js
 which cleanly intercepts backend crashes returning standardized stack trace & descriptive error JSON formats.
Pre-filled a 

.env
 variables environment file specifying default PORT, MONGO_URI, and JWT_SECRET.
6. Setup & Docs (

README.md
)
Generated a detailed, complete 

README.md
 at the project file root (

e:/altimind/ngo/server/README.md
) detailing exactly how you can install packages, spin up development servers manually, hit API endpoints, and view sample request/response JSONs.

To run the server now, open up your terminal in the backend directory (e:\altimind\ngo\server) and enter: