import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const InteractionList = ({ customerId }) => {
  const [interactions, setInteractions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const response = await axios.get("/customers/${customerId}/interactions");
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

  return (
    <div>
      <h2>Interactions</h2>
      <ul>
        {interactions.map(interaction => (
          <li key={interaction.id}>
            {interaction.title} on {new Date(interaction.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
      <Link to={"/customers/${customerId}/interactions/new"}>Log New Interaction</Link>
    </div>
  );
};

export default InteractionList;