import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import RegisterCustomer from './components/RegisterCustomer';
import RegisterAdmin from './components/RegisterAdmin';
import AdminLogin from './components/LoginAdmin';
import HomePage from './components/HomePage';
import AdminDashboard from './components/AdminDashbord';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/register-customer" element={<RegisterCustomer />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
