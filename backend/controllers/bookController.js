// backend/controllers/bookController.js
// ...
exports.getBookDetails = async (req, res) => {
  try {
    // Correct way to fetch the book and get the 'addedBy' field
    const book = await Book.findById(req.params.id).populate('addedBy', '_id');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    // ... rest of the code is the same
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};