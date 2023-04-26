import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input values
    if (!validator.isEmail(email)) {
      setEmailError('Invalid email');
      return;
    } else {
      setEmailError('');
    }

    if (!validator.isLength(name, { min: 2, max: 50 })) {
      setNameError('Name must be between 2 and 50 characters');
      return;
    } else {
      setNameError('');
    }

    if (!validator.isLength(password, { min: 6 })) {
      setPasswordError('Password must be at least 6 characters');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const token = localStorage.getItem('token'); 
  
      if (!token) {
        console.log('Token missing. Redirecting to login page.');
        navigate('/'); 
        return;
      }
  
      const config = {
        headers: { Authorization: `Bearer ${token}` }, 
      };
      const res = await axios.post('/api/users', { name, email, password }, config);
      navigate('/invoices');
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="error">{nameError}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;


