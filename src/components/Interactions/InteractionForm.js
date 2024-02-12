import React, { useState } from 'react';

const InteractionForm = ({ onSubmit, customerId }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ customerId, title, details, date });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <label>
        Details:
        <textarea value={details} onChange={e => setDetails(e.target.value)}></textarea>
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InteractionForm;