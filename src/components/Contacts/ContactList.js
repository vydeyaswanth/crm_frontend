import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate here
import axios from '../../api/axios';
import PropTypes from 'prop-types';

const ContactList = ({ customerId }) => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

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

  const handleEdit = (contactId) => {
    navigate(`/customers/${customerId}/contacts/${contactId}/edit`);
  };  

  const handleDelete = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`/customers/${customerId}/contacts/${contactId}`);
        const response = await axios.get(`/customers/${customerId}/contacts`);
        setContacts(response.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.email} - {contact.phone}
            <button onClick={() => handleEdit(contact.id)}>Edit</button>
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to={`/customers/${customerId}/contacts/new`}>Add New Contact</Link> 
    </div>
  );
};

ContactList.propTypes = {
  customerId: PropTypes.string.isRequired,
};

export default ContactList;
