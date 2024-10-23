import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios for making API requests
import './Login.css';  // Import the custom CSS for styling

function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me"
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend with the login credentials
      const response = await axios.post('/api/login', { student_id: studentId, password });

      if (response.data.success) {
        // On successful login, redirect to the schedule view
        navigate(`/schedule/${studentId}`);

        // Handle "Remember Me" logic
        if (rememberMe) {
          localStorage.setItem('studentId', studentId); // Store student ID in local storage
        } else {
          localStorage.removeItem('studentId'); // Clear local storage if "Remember Me" is unchecked
        }
      } else {
        // If the credentials are incorrect, display an error message
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Login failed. Please try again.');
    }
  };

  // Check if student ID is already stored in local storage
  React.useEffect(() => {
    const storedStudentId = localStorage.getItem('studentId');
    if (storedStudentId) {
      setStudentId(storedStudentId);
      setRememberMe(true);  // If the student ID is stored, set "Remember Me" to true
    }
  }, []);

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="VCU-logo.jpg" alt="VCU Logo" className="logo" />  
      </div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Student ID:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter your student ID"
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label>Remember Me</label>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
