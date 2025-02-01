import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        };

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', requestOptions);
            const text = await response.text();
            console.log(text);
            const data = JSON.parse(text);
            if (!response.ok) {
                throw new Error(data.error || 'You are not allowed to login from here');
            }
            setSuccess('Login successful!');
            navigate('/admin-dashboard');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <form onSubmit={handleSubmit} className="admin-login-form">
                <h2>Admin Login</h2>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    disabled={loading}
                    className="admin-login-input"
                />
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    disabled={loading}
                    className="admin-login-input"
                />
                <button type="submit" disabled={loading} className="admin-login-button">
                    {loading ? 'Logging in...' : 'Login as Admin'}
                </button>
                <button className="back-button" onClick={() => navigate('/')}>
                    Back
                </button>
                {error && <div className="admin-login-error">{error}</div>}
                {success && <div className="admin-login-success">{success}</div>}
            </form>
        </div>
    );
};

export default AdminLogin;
