// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BookDetails from './pages/BookDetails';
import AddEditBook from './pages/AddEditBook';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/add-book" element={<AddEditBook />} />
              <Route path="/edit-book/:id" element={<AddEditBook />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;