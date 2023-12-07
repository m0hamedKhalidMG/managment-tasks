import React, { useState } from 'react';
import './AuthForm.css';
import { BrowserRouter as Router, Switch, Route, Link,useNavigate,useLocation } from 'react-router-dom';
import { login,logout } from '../helper';
import {fetchdata} from '../hook'
const AuthForm = () => {
  
  const navigate = useNavigate(); 
  const location =useLocation()
  const [token, setToken] = useState('');

  // State to store form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Update form data when input values change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const redirectpath=location.state?.path || "/"

  const handleSubmit = (e) => {
    console.log(formData)
    e.preventDefault(); // Prevents the default form submission behavior
    login(`http://localhost:4000/api/auth/login`, formData)
    .then(Response => {
      localStorage.setItem('token', JSON.stringify(Response));
      setToken(Response.token);
      navigate(redirectpath,{replace:true})


    })
    .catch((error) => {
      console.error(error);
    });
};
const handleSignupClick = () => {
  navigate('/register');
};
  return (
    <div className="auth-container">
      <div className="form-container">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit" className="submit-button">
            Login
          </button>
          <p className="signup">
          Already have an account?{' '}
          <span onClick={handleSignupClick} style={{ cursor: 'pointer' }}>
            Signin
          </span>
        </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
