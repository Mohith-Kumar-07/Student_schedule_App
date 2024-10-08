import React from 'react';
import './App.css';  // Import CSS
import Login from './Login';  // Import the Login component

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Student Schedule App</h1>
      <Login />  {/* Render the Login component */}
    </div>
  );
}

export default App;
