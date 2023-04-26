import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const navigateTo = useNavigate();
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users', config);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/users/${id}`, config);
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== id));
      } else {
        console.log('Failed to delete user');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    navigateTo(`/Users/edit/${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="divide-y divide-gray-200">
        {users.map(user => (
          <li key={user._id} className="py-4 flex items-center justify-between">
            <div className="flex flex-col">
              <strong className="text-lg">{user.name}</strong>
              <span className="text-sm text-gray-600">{user.email}</span>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600" onClick={() => handleDelete(user._id)}>Delete</button>
              <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600" onClick={() => handleEdit(user._id)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
