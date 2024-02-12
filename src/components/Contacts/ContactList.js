import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const ContactList = ({ customerId }) => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/customers/${customerId}/contacts");
        setContacts(response.data);
      } catch (err) {
        setError('Error fetching contacts');
        console.error(err);
      }
    };

    fetchContacts();
  }, [customerId]);

  if (error) {
    return <p>{error}</p>;
  }

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