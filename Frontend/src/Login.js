import React, { useState } from 'react';
import axios from 'axios';

function Login({ setStudentData }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', id, password); // Debugging log
    try {
      const response = await axios.post('/api/login', { studentId: id, password });
      console.log('Login successful:', response.data); // Debugging log
      setStudentData(response.data);
      setError(null);
    } catch (err) {
      console.error('Login error:', err); // Debugging log
      setError('Invalid Student ID or Password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter Student ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
