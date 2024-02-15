import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ContactList = ({ customerId, refetchContacts }) => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`/customers/${customerId}/contacts`);
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

  useEffect(() => {
    refetchContacts();
  }, [customerId, refetchContacts]);

  return (
    <div>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.email} - {contact.phone}
          </li>
        ))}
      </ul>
      <Link to={{
        pathname: `/customers/${customerId}/contacts/new`,
        state: { customerId, refetchContacts }
      }}>Add New Contact</Link> 
    </div>
  );
};

ContactList.propTypes = {
  customerId: PropTypes.string.isRequired,
  contacts: PropTypes.array.isRequired,
  refetchContacts: PropTypes.func.isRequired,
};

export default ContactList;