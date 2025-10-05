// frontend/src/pages/BookDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBookDetails, addReview, deleteBook } from '../api/books';
import { useAuth } from '../context/AuthContext';
import ReviewList from '../components/ReviewList';
import '../styles/pages.css';
import '../styles/forms.css';
import '../styles/components.css';

const BookDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [reviewFormData, setReviewFormData] = useState({ rating: 1, reviewText: '' });

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            try {
                const { data } = await getBookDetails(id);
                setBook(data.book);
                setReviews(data.reviews);
                setAverageRating(data.averageRating);
            } catch (error) {
                console.error("Failed to fetch book details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    const handleReviewChange = (e) => {
        setReviewFormData({ ...reviewFormData, [e.target.name]: e.target.value });
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await addReview({ bookId: id, ...reviewFormData });
            const { data } = await getBookDetails(id);
            setReviews(data.reviews);
            setAverageRating(data.averageRating);
            setReviewFormData({ rating: 1, reviewText: '' });
        } catch (error) {
            console.error("Failed to add review:", error);
            alert('You must be logged in to add a review.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await deleteBook(id);
                navigate('/');
            } catch (error) {
                console.error("Failed to delete book:", error);
                alert('You are not authorized to delete this book.');
            }
        }
    };

    if (loading) return <div className="loading">Loading book details...</div>;
    if (!book) return <div className="not-found">Book not found.</div>;
    
    const isBookCreator = user && book.addedBy === user.id;

    return (
        <div className="book-details-page">
            <div className="details-header">
                <h1 className="page-title">{book.title}</h1>
                <p className="details-author">by {book.author}</p>
                <div className="details-rating">
                    Average Rating: <span className="rating-value">⭐ {averageRating}</span>
                </div>
            </div>

            <div className="details-section">
                <h3>Description</h3>
                <p>{book.description}</p>
            </div>

            <div className="details-section">
                <h3>Details</h3>
                <p><strong>Genre:</strong> {book.genre || 'N/A'}</p>
                <p><strong>Published Year:</strong> {book.publishedYear || 'N/A'}</p>
            </div>
            
            {isBookCreator && (
                <div className="book-actions">
                    <Link to={`/edit-book/${book._id}`} className="edit-button">Edit Book</Link>
                    <button onClick={handleDelete} className="delete-button">Delete Book</button>
                </div>
            )}

            {user && !isBookCreator && (
                <div className="review-form-container">
                    <h3>Add Your Review</h3>
                    <form onSubmit={handleReviewSubmit} className="review-form">
                        <div className="form-group">
                            <label htmlFor="rating">Rating (1-5)</label>
                            <select name="rating" id="rating" value={reviewFormData.rating} onChange={handleReviewChange}>
                                {[1, 2, 3, 4, 5].map(val => (
                                    <option key={val} value={val}>{val}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="reviewText">Review Text</label>
                            <textarea name="reviewText" id="reviewText" value={reviewFormData.reviewText} onChange={handleReviewChange} />
                        </div>
                        <button type="submit" className="form-button">Submit Review</button>
                    </form>
                </div>
            )}
            <ReviewList reviews={reviews} />
        </div>
    );
};

export default BookDetails;