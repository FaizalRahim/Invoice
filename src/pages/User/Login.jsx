import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });
  
      const { token } = response.data;
      localStorage.setItem('token', token);
      const userRole = response.data.role;
      localStorage.setItem('role', userRole);
  
      onLogin(response.data);
  
      // Navigate user to the appropriate page based on their role
      if (userRole === 'Sales') {
        navigate('/invoicesSales');
      } else {
        navigate('/createInvoice');
      }
    } catch (error) {
      console.error(error);
      // Show error message to user
    }
  };
  
  

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-medium mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 p-2 rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 p-2 rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;