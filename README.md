

# 📚 MERN Book Review Platform

A **full-stack book review application** built using the **MERN (MongoDB, Express, React, Node.js)** stack.
It demonstrates **secure user authentication**, **complete CRUD operations**, and **professional UI/UX** for managing and reviewing books.

---

## ✅ Key Features

| Feature            | Status     | Details                                                                                         |
| ------------------ | ---------- | ----------------------------------------------------------------------------------------------- |
| **Authentication** | ✅ Complete | Secure JWT sessions, bcrypt password hashing, and protected routes.                             |
| **Book CRUD**      | ✅ Complete | Create, update, and delete books. Only the creator can modify or remove their entries.          |
| **Review System**  | ✅ Complete | Allows users to add reviews. Includes average rating calculation and owner-specific management. |
| **Pagination**     | ✅ Complete | Displays 5 books per page with smooth pagination controls.                                      |
| **UI/UX**          | ✅ Complete | Clean, responsive interface styled with CSS using a **light purple and pink** theme.            |

---

## ⚙️ Setup & Launch Instructions

### 🔧 Prerequisites

Ensure the following are installed or configured:

* [Node.js (v18+)](https://nodejs.org/)
* [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas)

---

### 🖥️ I. Backend Setup (API)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install
```

#### ⚙️ Configure Environment

Create a `.env` file in the `backend` folder and include:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

#### 🚀 Run Backend Server

```bash
node server.js
```

> Runs on: [http://localhost:5000](http://localhost:5000)

---

### 💻 II. Frontend Setup (UI)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Launch development server
npm run dev
```

> Runs on: [http://localhost:5173](http://localhost:5173)

---

## 🌐 API Documentation

| Method     | Endpoint             | Description                                    | Access                 |
| ---------- | -------------------- | ---------------------------------------------- | ---------------------- |
| **POST**   | `/api/auth/register` | Register a new user.                           | Public                 |
| **POST**   | `/api/auth/login`    | Authenticate user and return JWT token.        | Public                 |
| **GET**    | `/api/books?page=X`  | Retrieve paginated list of books (5 per page). | Public                 |
| **POST**   | `/api/books`         | Create a new book record.                      | Private (JWT Required) |
| **GET**    | `/api/books/:id`     | Get details of a single book and its reviews.  | Public                 |
| **PUT**    | `/api/books/:id`     | Update a book’s details.                       | Private (Creator Only) |
| **DELETE** | `/api/books/:id`     | Delete a book record.                          | Private (Creator Only) |
| **POST**   | `/api/reviews`       | Add a review to a specified book.              | Private (JWT Required) |

---

## ✨ Tech Stack

* **Frontend:** React, CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Authentication:** JWT & bcrypt


## 📌 Summary

This project showcases **end-to-end MERN stack development**, focusing on:

* Secure **authentication & authorization**
* Complete **CRUD operations**
* A user-friendly **review system**
* Aesthetic **UI/UX design**
