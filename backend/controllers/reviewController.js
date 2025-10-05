// backend/controllers/reviewController.js
const Review = require('../models/Review');

// @desc    Add a review for a book
// @route   POST /api/reviews
// @access  Private
exports.addReview = async (req, res) => {
    const { bookId, rating, reviewText } = req.body;
    try {
        const newReview = new Review({
            book: bookId,
            user: req.user._id,
            rating,
            reviewText
        });
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private (only creator)
exports.updateReview = async (req, res) => {
    try {
        let review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to edit this review' });
        }

        review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private (only creator)
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this review' });
        }

        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};