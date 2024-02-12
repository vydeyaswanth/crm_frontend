import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerList from './components/Customers/CustomerList';
import CustomerForm from './components/Customers/CustomerForm';
import CustomerDetails from './components/Customers/CustomerDetails';
import ContactForm from './components/Contacts/ContactForm';
import InteractionForm from './components/Interactions/InteractionForm';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact component={CustomerList} />
          <Route path="/customers/new" component={CustomerForm} />
          <Route path="/customers/:id" component={CustomerDetails} />
          <Route path="/customers/:customerId/contacts/new" component={ContactForm} />
          <Route path="/customers/:customerId/interactions/new" component={InteractionForm} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;