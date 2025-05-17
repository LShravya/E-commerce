import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleLogin = (e) => {
  e.preventDefault();

  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (!storedUser) {
    alert('No user found. Please register first.');
    return;
  }

  const isEmailMatch = email === storedUser.email;
  const isPasswordMatch = password === storedUser.password;

  if (isEmailMatch && isPasswordMatch) {
    localStorage.setItem('authToken', 'dummyToken');
    navigate('/products');
    window.location.reload();
  } else {
    alert('Invalid Email or Password');
  }
};


  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(/images/1.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="login-container">
        <h2 className="welcome-heading">Welcome</h2>
        <h3 className="login-heading">Login</h3>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
