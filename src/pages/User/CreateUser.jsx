import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input values
    if (!validator.isEmail(email)) {
      alert('Invalid email');
      return;
    }

    if (!validator.isLength(name, { min: 2, max: 50 })) {
      alert('Name must be between 2 and 50 characters');
      return;
    }

    if (!validator.isLength(password, { min: 6 })) {
      alert('Password must be at least 6 characters');
      return;
    }


    try {
      const res = await axios.post('/api/users', { name, email, password });
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
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;

