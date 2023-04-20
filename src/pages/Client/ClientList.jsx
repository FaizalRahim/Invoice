import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ClientList() {
  const [clients, setClients] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    fetch('/api/clients')
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/clients/${id}`);
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
      const client = await axios.get(`/api/clients/${id}`);
      const updatedClient = { ...client.data };
      const response = await axios.put(`/api/clients/${id}`, updatedClient);
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
    <div>
      <h1>Clients</h1>
      <ul>
        {clients.map(client => (
          <li key={client._id}>
            <strong>{client.companyName}</strong> 
            <button onClick={() => handleDelete(client._id)}>Delete</button>
            <button onClick={() => handleEdit(client._id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientList;


