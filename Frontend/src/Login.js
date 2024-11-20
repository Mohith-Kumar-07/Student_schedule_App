import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';


function Login({ setStudentData }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { studentId: id, password });
      setStudentData(response.data);
      setError(null);
    } catch (err) {
      setError('Invalid Student ID or Password');
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="vcu-logo.jpg" alt="App Logo" className="logo" />
      </div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Student ID:</label>
          <input
            type="text"
            placeholder="Enter Student ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Login;