import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ContactForm = ({ customerId }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/customers/${customerId}/contacts', formData);
      navigate(`/customers/${customerId}`);
    } catch (err) {
      setError('Error creating contact');
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
      <button type="submit">Submit</button>
    </form>
  );
};

ContactForm.propTypes = {
  customerId: PropTypes.string.isRequired,
};

export default ContactForm;