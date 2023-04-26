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

    // Send POST request to create new user
    try {
      const res = await axios.post('/api/users', { name, email, password });
      navigate('/invoices');
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
  <h1 className="text-xl font-bold mb-4">Create User</h1>
  <form className="space-y-4" onSubmit={handleSubmit}>
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1" htmlFor="name">Name:</label>
      <input className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1" htmlFor="email">Email:</label>
      <input className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1" htmlFor="password">Password:</label>
      <input className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
    </div>
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit">Create User</button>
  </form>
</div>

  );
};

export default CreateUser;


