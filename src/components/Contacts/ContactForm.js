import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const ContactForm = ({ refetchContacts }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const { customerId } = useParams(); 
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/; // Simple regex for 10 digit number
    return re.test(phone);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setError('Invalid email address');
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError('Invalid phone number');
      return;
    }

    try {
      await axios.post(`/customers/${customerId}/contacts`, formData);
      if (refetchContacts) {
        await refetchContacts();
      }
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
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Submit</button>
    </form>
  );
};

ContactForm.propTypes = {
  refetchContacts: PropTypes.func.isRequired,
};

export default ContactForm;
