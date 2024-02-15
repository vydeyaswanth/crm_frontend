import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import ContactList from '../Contacts/ContactList';
import InteractionList from '../Interactions/InteractionList';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CustomerDetails = ({ refetchCustomers }) => {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams(); // Gets the customer ID from URL params 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`/customers/${id}`);
        setCustomer(response.data);
      } catch (err) {
        setError('Error fetching customer details');
        console.error(err);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  const onBack = () => {
    navigate('/');
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!customer) {
    return <p>Loading customer details...</p>;
  }

  const refetchContacts = async () => {
    try {
      const response = await axios.get(`/customers/${id}/contacts`);
      setCustomer(previousState => ({ ...previousState, contacts: response.data }));
    } catch (err) {
      console.error('Error refetching contacts:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axios.delete(`/customers/${id}`);
        await refetchCustomers(); // Refetch the customer list
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2>Customer Details</h2>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>

      <h3>Contacts</h3>
      <ContactList contacts={customer.contacts} customerId={customer.id} refetchContacts={refetchContacts} />

      <h3>Interactions</h3>
      <InteractionList interactions={customer.interactions} customerId={customer.id} />

      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <button onClick={onBack}>Back to Customer List</button>
      </div>

      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Link to={`/customers/${customer.id}/edit`}>Edit Customer</Link>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Link to="/" onClick={handleDelete}>Delete Customer</Link>
      </div>
    </div>
  );
};

CustomerDetails.propTypes = {
  refetchCustomers: PropTypes.func.isRequired,
};

export default CustomerDetails;