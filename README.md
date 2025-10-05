MERN Book Review Platform
A full-stack application built using the MERN (MongoDB, Express, React, Node.js) stack, demonstrating secure user authentication, comprehensive CRUD operations, and professional data presentation.

✅ Key Project Features
Feature	Status	Details
Authentication	Complete	Secure JWT sessions, bcrypt hashing, and protected routes.
Book CRUD	Complete	Full creation, update, and deletion logic. Creator-only permissions enforced.
Review System	Complete	Average Rating calculation and owner-specific review management.
Pagination	Complete	Optimized display (5 books per page) with functional controls.
UI/UX	Complete	Styled with standard CSS, featuring a clean, responsive interface with a light purple and pink theme.
🚀 Setup & Launch Instructions
Prerequisites
Node.js (v18+)

MongoDB Atlas Account

I. Backend Setup (API)
Install: cd backend && npm install

Configure: Create a .env file with your MONGO_URI and JWT_SECRET.

Launch: node server.js (Runs on http://localhost:5000)

II. Frontend Setup (UI)
Install: cd frontend && npm install

Launch: npm run dev (Runs on http://localhost:5173)

🌐 API Documentation
Method	Endpoint	Description	Access
POST	/api/auth/register	Registers a new user.	Public
POST	/api/auth/login	Authenticates a user and returns a JWT token.	Public
GET	/api/books?page=X	Retrieves a paginated list of books (5 per page).	Public
POST	/api/books	Creates a new book record.	Private (JWT Required)
GET	/api/books/:id	Retrieves a single book and its reviews.	Public
PUT	/api/books/:id	Updates a book's details.	Private (Creator Only)
DELETE	/api/books/:id	Deletes a book record.	Private (Creator Only)
POST	/api/reviews	Adds a review to a specified book.	Private (JWT Required)
