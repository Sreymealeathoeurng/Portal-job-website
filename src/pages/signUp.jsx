import React, { useState } from 'react';
import './assets/css/loginForm.css';


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
            alert("Passwords do not match!");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Prepare data for submission
        const userData = { firstName, lastName, phoneNumber, password };

        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const data = await response.json();
            setMessage("Registration successful!");
            console.log(data); // Handle successful registration response

            // Reset form
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setMessage(error.message);
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

const LoginForm = ({ toggleForm }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!userName || !password) {
            setMessage("Both fields are required.");
            return;
        }

        // Prepare data for submission
        const loginData = { userName, password };

        try {
            const response = await fetch('http://localhost:3001/login', { // Updated endpoint for clarity
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            setMessage("Login successful!");
            console.log(data); // Handle successful login response

            // You can also add logic to redirect the user or store authentication tokens here

        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Portal Job Sign In</h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <label htmlFor="user_name">Phone Number or Username *</label>
                <input
                    type="text"
                    id="user_name"
                    placeholder="Phone Number or Username *"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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

            <div className="icon">
                <i className="fa-solid fa-phone"></i>
                <div className="or-contain">
                    <hr />
                    <span>Or</span>
                    <hr />
                </div>
                <i className="fa-brands fa-facebook"></i>
            </div>
            <div className="botton-contain">
                <label>No Account Yet?</label>
                <button onClick={toggleForm} id="btnCreateAcc">Create An Account</button>
                <p style={{ textAlign: 'center', fontSize: '12px' }}>
                    By continuing, you agree to our <a href="#">Posting Rule</a> and <a href="#">Privacy Policy</a>.
                </p>
            </div>
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