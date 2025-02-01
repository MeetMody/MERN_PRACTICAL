import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <h1>Welcome to Registration and Login</h1>
            <div className="buttons-container">
                <Link to="/register-admin" className="home-button admin-register">
                    Admin Register
                </Link>
                <Link to="/register-customer" className="home-button customer-register">
                    Customer Register
                </Link>
                <Link to="/admin-login" className="home-button admin-login">
                    Admin Login
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
