import React, { useState } from 'react';
import '../styles/App.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username.trim()) {
      // Save username to localStorage
      localStorage.setItem('taskTracker_user', JSON.stringify(username.trim()));
      onLogin(username.trim());
    } else {
      setError('Please enter a username');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1f2937' }}>
          📋 Task Tracker
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              className="form-input"
              placeholder="Enter your username"
              autoFocus
            />
            {error && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {error}
              </p>
            )}
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;