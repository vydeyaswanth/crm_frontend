import React from 'react';
import { Link } from 'react-router-dom';
import ContactList from './Contacts/ContactList';
import InteractionList from './Interactions/InteractionList';

const CustomerDetails = ({ customer, onBack }) => {
  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Customer Details</h2>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>

      <ContactList contacts={customer.contacts} customerId={customer.id} />
      <InteractionList interactions={customer.interactions} customerId={customer.id} />

      <button onClick={onBack}>Back to Customer List</button>
      <Link to={"/customers/${customer.id}/edit"}>Edit Customer</Link>
    </div>
  );
};

export default CustomerDetails;