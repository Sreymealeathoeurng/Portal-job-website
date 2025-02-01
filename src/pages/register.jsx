import React, { useState } from 'react';
import axios from 'axios';
import './assets/css/loginForm.css';
import LoginForm from './login'; // Ensure this path is correct

const RegisterForm = ({ toggleForm }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        const userData = {
            first_name: firstName,
            last_name: lastName,
            phonenumber: phoneNumber,
            password,
        };

        try {
            const response = await axios.post('http://localhost:5000/register', userData);
            setMessage(response.data.message || 'Registration successful!');

            // Reset form after successful registration
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || 'Registration failed');
            } else {
                setMessage('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Register to Portal Job</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name *</label>
                <input
                    type="text"
                    id="firstName"
                    placeholder="First Name *"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor="lastName">Last Name *</label>
                <input
                    type="text"
                    id="lastName"
                    placeholder="Last Name *"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor="phoneNumber">Phone Number *</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    placeholder="Phone Number *"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <label htmlFor="password">Password *</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password *"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password *"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button type="submit" id="btnSubmit">Submit</button>
            </form>
            {message && <p className="message">{message}</p>}
            <div className="login-link-container">
                <p>No Account Yet? <span onClick={toggleForm} style={{ color: 'blue', cursor: 'pointer' }}>Log in</span></p>
            </div>
            <p style={{ textAlign: 'center', fontSize: '12px' }}>
                By continuing, you agree to our <a href="#">Posting Rule</a> and <a href="#">Privacy Policy</a>.
            </p>
        </div>
    );
};

const Register = () => {
    const [isLogin, setIsLogin] = useState(false);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <main className="RegisterContainer">
            {isLogin ? <LoginForm toggleForm={toggleForm} /> : <RegisterForm toggleForm={toggleForm} />}
        </main>
    );
};

export default Register;