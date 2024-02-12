import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const InteractionForm = ({ customerId }) => {
  const [formData, setFormData] = useState({ title: '', details: '', date: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`/customers/${customerId}/interactions`, formData); // Use backticks for template literals
      navigate(`/customers/${customerId}`); // Use backticks for template literals
    } catch (err) {
      setError('Error logging interaction');
      console.error(err);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={formData.title} onChange={handleChange} name="title" />
      </label>
      <label>
        Details:
        <textarea value={formData.details} onChange={handleChange} name="details"></textarea>
      </label>
      <label>
        Date:
        <input type="date" value={formData.date} onChange={handleChange} name="date" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

InteractionForm.propTypes = {
  customerId: PropTypes.string.isRequired,
};

export default InteractionForm;
