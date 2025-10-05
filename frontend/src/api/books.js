// frontend/src/api/books.js
import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
export const getBooks = (page) => API.get(`/books?page=${page}`);
export const addBook = (bookData) => API.post('/books', bookData);
export const getBookDetails = (id) => API.get(`/books/${id}`);
export const updateBook = (id, bookData) => API.put(`/books/${id}`, bookData);
export const deleteBook = (id) => API.delete(`/books/${id}`);
export const addReview = (reviewData) => API.post('/reviews', reviewData);
export const updateReview = (id, reviewData) => API.put(`/reviews/${id}`, reviewData);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);