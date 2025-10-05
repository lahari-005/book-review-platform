// frontend/src/pages/AddEditBook.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addBook, getBookDetails, updateBook } from '../api/books';
import { useAuth } from '../context/AuthContext';
import '../styles/forms.css';

const AddEditBook = () => {
    const { id } = useParams();
    const isEditing = !!id;
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        genre: '',
        publishedYear: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (isEditing) {
            const fetchBook = async () => {
                try {
                    const { data } = await getBookDetails(id);
                    // Check if the logged-in user is the owner of the book
                    if (data.book.addedBy !== user.id) {
                        alert("You can only edit books you have added.");
                        navigate('/');
                        return;
                    }
                    setFormData({
                        title: data.book.title,
                        author: data.book.author,
                        description: data.book.description,
                        genre: data.book.genre,
                        publishedYear: data.book.publishedYear
                    });
                } catch (err) {
                    setError('Failed to load book data.');
                    console.error(err);
                }
            };
            fetchBook();
        }
    }, [id, isEditing, navigate, user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateBook(id, formData);
                navigate(`/books/${id}`);
            } else {
                await addBook(formData);
                navigate('/');
            }
        } catch (err) {
            setError('Failed to save book. Please try again.');
            console.error(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form-card">
                <h2 className="form-title">{isEditing ? 'Edit Book' : 'Add New Book'}</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input type="text" name="author" id="author" value={formData.author} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" value={formData.description} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <input type="text" name="genre" id="genre" value={formData.genre} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="publishedYear">Published Year</label>
                    <input type="number" name="publishedYear" id="publishedYear" value={formData.publishedYear} onChange={handleChange} />
                </div>
                <button type="submit" className="form-button">{isEditing ? 'Update Book' : 'Add Book'}</button>
            </form>
        </div>
    );
};

export default AddEditBook;