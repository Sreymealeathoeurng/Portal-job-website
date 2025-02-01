import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './assets/css/loginForm.css';

const LoginForm = ({ toggleForm }) => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = { phonenumber, password };

        try {
            const response = await axios.post('http://localhost:5000/login', loginData);
            setMessage(`Login successful! Welcome, ${response.data.user.first_name}`);

            // Store user data in local storage
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Navigate to User Account after successful login
            navigate('/UserAcc');

            // Reset input fields
            setPhonenumber('');
            setPassword('');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || 'Login failed.');
            } else {
                setMessage('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="displayUser">
            <div className="form-container">
                <h2>Portal Job Sign In</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="phonenumber">Phone Number *</label>
                    <input
                        type="text"
                        id="phonenumber"
                        placeholder="Phone Number *"
                        required
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
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

                    <button type="submit" id="btnSubmit">Submit</button>
                    <span>Forgot Password or Account?</span>
                </form>
                
                {message && <p className="message">{message}</p>}

                <div className="bottom-contain">
                    <label>No Account Yet?</label>
                    <button onClick={toggleForm} id="btnCreateAcc">Create An Account</button>
                    <p style={{ textAlign: 'center', fontSize: '12px' }}>
                        By continuing, you agree to our <a href="#">Posting Rule</a> and <a href="#">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;