import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ClientList() {
  const [clients, setClients] = useState([]);
  const navigateTo = useNavigate();
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}`},};

  useEffect(() => {
    fetch('/api/clients', config)
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/clients/${id}`, config);
      if (response.status === 200) {
        setClients(clients.filter((client) => client._id !== id));
      } else {
        console.log('Failed to delete client');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const client = await axios.get(`/api/clients/${id}`, config);
      const updatedClient = { ...client.data };
      const response = await axios.put(`/api/clients/${id}`, updatedClient, config);
      if (response.status === 200) {
        const updatedClient = response.data;
        console.log(updatedClient);
        navigateTo(`/Client/edit/${id}`);
      } else {
        console.log('Failed to update client');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <h1 className="text-2xl font-bold mb-4">Clients</h1>
  <ul className="divide-y divide-gray-200">
    {clients.map(client => (
      <li key={client._id} className="py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <strong className="text-lg">{client.companyName}</strong>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600" onClick={() => handleDelete(client._id)}>Delete</button>
          <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600" onClick={() => handleEdit(client._id)}>Edit</button>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
}

export default ClientList;


