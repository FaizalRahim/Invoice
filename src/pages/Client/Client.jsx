import React, { useState, useEffect } from 'react';

function ClientList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch('/api/clients')
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      setClients(clients.filter(client => client._id !== id));
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
            <strong>{client.companyName}</strong> - {client.personInCharge} - {client.companyEmail}
            <button onClick={() => handleDelete(client._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientList;
