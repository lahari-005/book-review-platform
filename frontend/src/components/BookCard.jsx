// frontend/src/components/BookCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components.css';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">by {book.author}</p>
      <p className="book-genre">{book.genre}</p>
      <Link to={`/books/${book._id}`} className="view-details-link">
        View Details
      </Link>
    </div>
  );
};

export default BookCard;