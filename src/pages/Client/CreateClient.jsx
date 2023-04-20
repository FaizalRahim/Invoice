import React, { useState } from 'react';
import axios from 'axios';


function CreateClient(props) {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [personInCharge, setPersonInCharge] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [paymentTerm, setPaymentTerm] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Pending validation


    // Send data to server
    try {
      const response = await axios.post(`/api/clients`, {
        companyName,
        companyAddress,
        personInCharge,
        companyEmail,
        paymentTerm
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 201) {
        const client = response.data;
        props.onClientCreated(client);
      } else {
        console.log('Failed to create client');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Create Client</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input type="text" id="companyName" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="companyAddress">Company Address:</label>
          <input
            type="text"
            id="companyAddress"
            value={companyAddress}
            onChange={(event) => setCompanyAddress(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="personInCharge">Person in Charge:</label>
          <input type="text" id="personInCharge" value={personInCharge} onChange={(event) => setPersonInCharge(event.target.value)} />
        </div>
        <div>
          <label htmlFor="companyEmail">Company Email:</label>
          <input type="email" id="companyEmail" value={companyEmail} onChange={(event) => setCompanyEmail(event.target.value)} />
        </div>
        <div>
          <label htmlFor="paymentTerm">Payment Term (Days):</label>
          <input type="number" id="paymentTerm" value={paymentTerm} onChange={(event) => setPaymentTerm(event.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateClient;
