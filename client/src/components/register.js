import './Register.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUp } from '../helper';

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    SignUp(`http://localhost:4000/api/auth/register`, formData)
    .then(Response => {
      navigate('/login')


    })

  };
  const handleSignInClick = () => {
    navigate('/login');
  };
  return  (
    <div className="min-h-screen flex items-center justify-center">
    <form className="form" onSubmit={handleSubmit}>
      <p className="title">Register</p>
      <p className="message">Signup now and get full access to our app.</p>
      <div className="flex">
        <label>
          <input
            className="input"
            type="text"
            placeholder=""
            required
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <span>Firstname</span>
        </label>

        <label>
          <input
            className="input"
            type="text"
            placeholder=""
            required
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <span>Lastname</span>
        </label>
      </div>

      <label>
        <input
          className="input"
          type="email"
          placeholder=""
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <span>Email</span>
      </label>

      <label>
        <input
          className="input"
          type="password"
          placeholder=""
          required
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <span>Password</span>
      </label>

      


      <button type="submit" className="submit">
        Submit
      </button>

      <p className="signin">
      Already have an account?{' '}
      <span onClick={handleSignInClick} style={{ cursor: 'pointer' }}>
        Signin
      </span>
    </p>

    </form></div>
  );
}
