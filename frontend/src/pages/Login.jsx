// frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/forms.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData);
      authLogin(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError('Login failed. Invalid credentials.');
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-card">
        <h2 className="form-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={handleChange} required />
        </div>
        <button type="submit" className="form-button">Login</button>
        <p className="form-link-text">
          Don't have an account? <Link to="/signup" className="form-link">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;