// frontend/src/api/auth.js
import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });
export const signup = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);