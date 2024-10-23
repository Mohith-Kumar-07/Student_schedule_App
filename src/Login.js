// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/api/login', { student_id: studentId, password });
            
            if (response.data.success) {
                const { firstName, lastName, semester, year } = response.data.student;

                // Save student data in local storage for session
                localStorage.setItem('studentInfo', JSON.stringify({ studentId, firstName, lastName, semester, year }));
                
                // Redirect to the schedule page
                navigate(`/schedule/${studentId}`);
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <div>
                    <label>Student ID:</label>
                    <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
