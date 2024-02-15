import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerList from './components/Customers/CustomerList';
import CustomerForm from './components/Customers/CustomerForm';
import CustomerDetails from './components/Customers/CustomerDetails';
import ContactForm from './components/Contacts/ContactForm';
import InteractionForm from './components/Interactions/InteractionForm';
import CustomerEdit from './components/Customers/CustomerEdit';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<CustomerList />} exact />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
          <Route path="/customers/:customerId/contacts/new" element={<ContactForm />} />
          <Route path="/customers/:customerId/interactions/new" element={<InteractionForm />} />
          <Route path="/customers/:id/edit" element={<CustomerEdit />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;