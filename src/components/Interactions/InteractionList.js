import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const InteractionList = ({ customerId }) => {
  const [interactions, setInteractions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const response = await axios.get(`/customers/${customerId}/interactions`);
        setInteractions(response.data);
      } catch (err) {
        setError('Error fetching interactions');
        console.error(err);
      }
    };

    fetchInteractions();
  }, [customerId]);

  if (error) {
    return <p>{error}</p>;
  }

  const handleEdit = (interactionId) => {
    navigate(`/customers/${customerId}/interactions/${interactionId}/edit`);
  };

  const handleDelete = async (interactionId) => {
    if (window.confirm('Are you sure you want to delete this interaction?')) {
      try {
        await axios.delete(`/customers/${customerId}/interactions/${interactionId}`);
        setInteractions(prevInteractions => prevInteractions.filter(i => i.id !== interactionId));
      } catch (err) {
        console.error('Error deleting interaction:', err);
      }
    }
  };

  return (
    <div>
      <ul>
        {interactions.map(interaction => (
          <li key={interaction.id}>
            <strong>{interaction.title}</strong> on {new Date(interaction.date).toLocaleDateString()}
            <p>{interaction.details}</p>
            <button onClick={() => handleEdit(interaction.id)}>Edit</button>
            <button onClick={() => handleDelete(interaction.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to={`/customers/${customerId}/interactions/new`}>Log New Interaction</Link>
    </div>
  );
};

InteractionList.propTypes = {
  customerId: PropTypes.string.isRequired,
};

export default InteractionList;