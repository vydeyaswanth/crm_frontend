import React, { useState } from 'react';
import axios from '../api/axios';
import { useHistory } from 'react-router-dom';

const InteractionForm = ({ customerId }) => {
  const [formData, setFormData] = useState({ title: '', details: '', date: '' });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/customers/${customerId}/interactions", formData);
      history.push("/customers/${customerId}");
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
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <label>
        Details:
        <textarea value={details} onChange={e => setDetails(e.target.value)}></textarea>
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InteractionForm;