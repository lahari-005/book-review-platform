// frontend/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { getBooks } from '../api/books';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import '../styles/pages.css';

const Home = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (user) {
      const fetchBooks = async () => {
        setLoading(true);
        try {
          const { data } = await getBooks(currentPage);
          setBooks(data.books);
          setTotalPages(data.totalPages);
        } catch (error) {
          console.error("Failed to fetch books:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    }
  }, [user, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (!user) {
    return (
      <div className="landing-page-container">
        <h1 className="landing-title">Welcome to BookSphere</h1>
        <p className="landing-text">Your personal platform for discovering and reviewing books.</p>
        <div className="landing-buttons">
          <Link to="/login" className="landing-button login-btn">Login</Link>
          <Link to="/signup" className="landing-button signup-btn">Sign Up</Link>
        </div>
      </div>
    );
  }

  // Content for logged-in users
  if (loading) return <div className="loading">Loading books...</div>;

  return (
    <div className="home-page">
      <h1 className="page-title">Book Reviews</h1>
      <div className="book-list">
        {books.length > 0 ? (
          books.map(book => (
            <BookCard key={book._id} book={book} />
          ))
        ) : (
          <p className="no-books-message">No books found. Be the first to add one!</p>
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;