import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

    const navigate = useNavigate();
  return (
    <div className="admin-dashboard-container">
      <div className="welcome-message">
        <h1>Welcome to Admin Dashboard</h1>
        <p>This is your admin dashboard where you can manage users, settings, and more.</p>
      </div>
      <button className="back-button" onClick={() => navigate('/')}>
                    Back to the register page
                </button>
    </div>
  );
};

export default AdminDashboard;
