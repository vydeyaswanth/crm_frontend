import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const ContactEdit = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { customerId, contactId } = useParams();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`/customers/${customerId}/contacts/${contactId}`);
        setFormData(response.data);
      } catch (err) {
        setError('Error fetching contact');
        console.error(err);
      }
    };

    fetchContact();
  }, [customerId, contactId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/customers/${customerId}/contacts/${contactId}`, formData);
      // Navigate back to CustomerDetails
      navigate(`/customers/${customerId}`);
      // Trigger a refresh of the contact list in CustomerDetails component
      // This can be done using a global state, context, or another method
    } catch (err) {
      setError('Error updating contact');
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
        <input type="text" value={formData.name} onChange={handleChange} name="name" />
      </label>
      <label>
        Email:
        <input type="email" value={formData.email} onChange={handleChange} name="email" />
      </label>
      <label>
        Phone:
        <input type="text" value={formData.phone} onChange={handleChange} name="phone" />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ContactEdit;
