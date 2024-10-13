import React, { useState } from 'react';
import './Login.css';  // Import the CSS file

const Login = () => {
  const [studentId, setStudentId] = useState('');  // State for Student ID
  const [password, setPassword] = useState('');  // State for Password

  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent page reload on form submission
    console.log("Login Submitted");
    console.log("Student ID:", studentId);
    console.log("Password:", password);
  };

  return (
    <div>
      <h2>Student Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>
            Student ID:
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}  // Update Student ID state
              required  // Ensure the field is mandatory
            />
          </label>
        </div>

        <div className="form-field">
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Update Password state
              required  // Ensure the field is mandatory
            />
          </label>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
