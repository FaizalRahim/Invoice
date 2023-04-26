import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import validator from 'validator';

function EditUser(props) {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` }, };

  useEffect(() => {
    fetch(`/api/users/${userId}`, config)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
      })
      .catch(error => console.log(error));
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validator.isEmail(email)) {
      console.log('Invalid email address');
      return;
    }

    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          role,
        }),
      });

      // Log the response status and data
    console.log('Response status:', response.status);
    console.log('Response data:', await response.json());

      if (response.ok) {
        navigate(`/users`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Edit User</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
            <select
            id="role"
            value={role}
            onChange={e => setRole(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full"
            >
            <option value="">Select a role</option>
            <option value="Sales">Sales</option>
            <option value="Admin">Admin</option>
            </select>
      </div>
      <div className="pt-5">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</div>

);
}

export default EditUser;