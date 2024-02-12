import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import ContactList from '../Contacts/ContactList';
import InteractionList from '../Interactions/InteractionList';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams(); // Gets the customer ID from URL params
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get('/customers/${id}');
        setCustomer(response.data);
      } catch (err) {
        setError('Error fetching customer details');
        console.error(err);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  const onBack = () => {
    // Navigate back to the customer list
    navigate.push('/');
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!customer) {
    return <p>Loading customer details...</p>;
  }

  return (
    <div>
      <h2>Customer Details</h2>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>

      <h3>Contacts</h3>
      <ContactList contacts={customer.contacts} customerId={customer.id} />

      <h3>Interactions</h3>
      <InteractionList interactions={customer.interactions} customerId={customer.id} />

      <button onClick={onBack}>Back to Customer List</button>
      <Link to={'/customers/${customer.id}/edit'}>Edit Customer</Link>
    </div>
  );
};

export default CustomerDetails;