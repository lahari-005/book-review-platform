// frontend/src/components/ReviewList.jsx
import React from 'react';
import '../styles/components.css';

const ReviewList = ({ reviews }) => {
  return (
    <div className="review-list-container">
      <h3>Reviews ({reviews.length})</h3>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review._id} className="review-item">
            <div className="review-header">
              <span className="review-author">{review.user.name}</span>
              <span className="review-rating">⭐ {review.rating}/5</span>
            </div>
            <p className="review-text">{review.reviewText}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to add one!</p>
      )}
    </div>
  );
};

export default ReviewList;