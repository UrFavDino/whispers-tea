import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import '../Login/Login.css'; 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('User'); // Added state for account type
    const navigate = useNavigate();

    // Function to handle the login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, accountType }), // Send accountType as part of the request
            });
    
            const data = await response.json();
    
            if (data.success) {
                alert('Login successful');
                localStorage.setItem('username', username); // Store username in localStorage
                navigate('/'); // Redirect to the home page
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred while logging in');
        }
    };

    return (
        <div className="background-container">
            <link
                href="https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap"
                rel="stylesheet"
            />
            <div className="login-container">
                <Form className="login-form" onSubmit={handleLogin}>
                    <h4 className='title' style={{fontSize: '50px'}}>Whisper</h4>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        {/* Dropdown for selecting account type */}
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className='drop-login'>
                                {accountType} Accounts
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setAccountType('User')}>User</Dropdown.Item>
                                <Dropdown.Item onClick={() => setAccountType('Admin')}>Admin</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control 
                            type="text" 
                            placeholder="Username" 
                            value={username}  
                            onChange={(e) => setUsername(e.target.value)} 
                            className="login-username" 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-password" 
                        />
                    </Form.Group>
                    <button type="submit" variant="primary" className="btn-login">
                        Submit
                    </button>
                    <div className='btn-signup'>
                        Don't have an account?{' '}
                        <Link to="/signup" className="btn-link">
                            Signup
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
