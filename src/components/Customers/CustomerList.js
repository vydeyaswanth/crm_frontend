import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/customers');
        setCustomers(response.data);
      } catch (err) {
        setError('Error fetching customers');
        console.error(err);
      }
    };

    fetchCustomers();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Customers</h2>
      <ul>{customers.map(customer => (<li key={customer.id}><Link to={"/customers/${customer.id}"}>{customer.name}</Link></li>))}</ul>
      <Link to="/customers/new">Add New Customer</Link>
    </div>
  );
};

export default CustomerList;