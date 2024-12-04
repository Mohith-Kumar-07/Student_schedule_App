import React, { useState } from 'react';
import './Login.css';

function Login({ setStudentData }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: id, password }),
      });
      if (!response.ok) throw new Error('Invalid Student ID or Password');
      const data = await response.json();
      setStudentData(data);
      setError(null);
    } catch (err) {
      setError('Invalid Student ID or Password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container text-center mb-4">
          <img src="vcu-logo.jpg" alt="App Logo" className="logo" />
        </div>
        <h3 className="text-center mb-3">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="id" className="form-label">Student ID</label>
            <input
              type="text"
              id="id"
              className="form-control"
              placeholder="Enter Student ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
           <label htmlFor="password" className="form-label">Password</label>
           <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
