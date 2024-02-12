import React, { useState } from 'react';
import axios from '../api/axios';
import { useHistory } from 'react-router-dom';

const CustomerForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/customers', formData);
      history.push('/');
    } catch (err) {
      setError('Error creating customer');
      console.error(err);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomerForm;