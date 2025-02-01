import React, { useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import '../App.css';

const RegisterAdmin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { firstName, lastName, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const passwordRegex = /^\d{6}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError("Password must be exactly 6 digits.");
            setTimeout(() => setPasswordError(''), 3000); // Show error for 3 seconds
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Send email verification
            await sendEmailVerification(userCredential.user);

            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    role: 'admin'
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Registration failed');
            }

            const data = await res.json();
            console.log(data);
            setShowPopup(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            });
            setTimeout(() => setShowPopup(false), 2000); // Show popup for 2 seconds
        } catch (err) {
            console.error('Error:', err);
            setErrorMessage(err.message);
            setTimeout(() => setErrorMessage(''), 2000); // Show error message for 2 seconds
        }
    };

    return (
        <div className="register-admin-container">
            {showPopup && (
                <div className="popup">
                    Registration successful! Please check your email to verify your account.
                </div>
            )}
            {errorMessage && (
                <div className="popup">
                    Email address already registered
                </div>
            )}
            {passwordError && (
                <div className="popup">
                    Password must be exactly 6 digits.
                </div>
            )}
            <form onSubmit={onSubmit} className="register-admin-form">
                <h2>Register Admin</h2>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={onChange}
                        placeholder="First Name"
                        required
                        className="register-admin-input"
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={onChange}
                        placeholder="Last Name"
                        required
                        className="register-admin-input"
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Email"
                        required
                        className="register-admin-input"
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Password"
                        required
                        className="register-admin-input"
                    />
                </label>
                <button type="submit" className="register-admin-button">
                    Register as Admin
                </button>
                <button className="back-button" onClick={() => navigate('/')}>
                    Back
                </button>
            </form>
        </div>
    );
};

export default RegisterAdmin;
