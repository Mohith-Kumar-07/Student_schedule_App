import React, { useState } from 'react';
import './Login.css';  // Import the CSS file

const Login = () => {
  const [studentId, setStudentId] = useState('');  // State for Student ID
  const [password, setPassword] = useState('');  // State for Password
  const [rememberMe, setRememberMe] = useState(false);  // State for "Remember Me" checkbox
  const [loginSuccess, setLoginSuccess] = useState(false);  // State to track login success
  const [errorMessage, setErrorMessage] = useState('');  // State for error message

  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent page reload on form submission

    // Validation for Student ID
    const idPattern = /^V-\d{8}$/;  // Example format: V-12345678
    if (!idPattern.test(studentId)) {
      setErrorMessage("Invalid Student ID format. Use 'V-XXXXXXXX'.");
      setLoginSuccess(false);
      return;
    }

    // Simulate successful login if Student ID and Password are filled and valid
    if (studentId && password) {
      setLoginSuccess(true);  // Set login success to true if fields are filled
      setErrorMessage('');  // Clear the error message
      console.log("Login Submitted");
      console.log("Student ID:", studentId);
      console.log("Remember Me:", rememberMe ? "Yes" : "No");
    }
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

        {/* Remember Me Checkbox */}
        <div className="form-field remember-me">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}  // Update "Remember Me" state
            />
            Remember Me
          </label>
        </div>

        <button type="submit">Login</button>

        {/* Display error message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Display success message */}
        {loginSuccess && (
          <p className="success-message">You have successfully logged in with Student ID: {studentId}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
