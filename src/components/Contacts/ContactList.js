import React from 'react';
import { Link } from 'react-router-dom';

const ContactList = ({ contacts, customerId }) => {
  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.email} - {contact.phone}
          </li>
        ))}
      </ul>
      <Link to={"/customers/${customerId}/contacts/new"}>Add New Contact</Link>
    </div>
  );
};

export default ContactList;