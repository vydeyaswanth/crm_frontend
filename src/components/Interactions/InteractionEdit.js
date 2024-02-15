import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const InteractionEdit = () => {
  const [formData, setFormData] = useState({ title: '', details: '', date: '' });
  const [error, setError] = useState('');
  const { customerId, interactionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInteraction = async () => {
        try {
          const response = await axios.get(`/customers/${customerId}/interactions/${interactionId}`);
          const interactionData = response.data;
          const formattedDate = new Date(interactionData.date).toISOString().split('T')[0];
      
          setFormData({ ...interactionData, date: formattedDate });
        } catch (err) {
          setError('Error fetching interaction details');
          console.error(err);
        }
      };

    fetchInteraction();
  }, [customerId, interactionId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/customers/${customerId}/interactions/${interactionId}`, formData);
      navigate(`/customers/${customerId}`);
    } catch (err) {
      setError('Error updating interaction');
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
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default InteractionEdit;