import React, { useState } from 'react';

const ContactForm = ({ onSubmit, customerId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ customerId, name, email, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Phone:
        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;