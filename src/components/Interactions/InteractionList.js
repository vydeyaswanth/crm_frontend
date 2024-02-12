import React from 'react';

const InteractionList = ({ interactions, customerId }) => {
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