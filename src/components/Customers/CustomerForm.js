import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const CustomerForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(formData.email)) {
      setError('Invalid email address');
      return;
    }

    try {
      await axios.post('/customers', formData);
      navigate('/');
    } catch (err) {
      setError('Error creating customer');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={formData.name} onChange={handleChange} name="name" />
      </label>
      <label>
        Email:
        <input type="email" value={formData.email} onChange={handleChange} name="email" />
      </label>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomerForm;
