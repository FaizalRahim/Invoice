import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

function CreateClient(props) {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [personInCharge, setPersonInCharge] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [paymentTerm, setPaymentTerm] = useState('');
  const [companyEmailError, setCompanyEmailError] = useState('');
  const [paymentTermError, setPaymentTermError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}`},
  'Content-Type': 'application/json'};

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input fields
    if (!validator.isEmail(companyEmail)) {
      setCompanyEmailError('Invalid email');
      return;
    } else {
      setCompanyEmailError('');
    }

    if (!validator.isNumeric(paymentTerm)) {
      setPaymentTermError('Payment term must be a number');
      return;
    } else {
      setPaymentTermError('');
    }

    // Send data to server
    try {
      const response = await axios.post(`/api/clients`, {
        companyName,
        companyAddress,
        personInCharge,
        companyEmail,
        paymentTerm,
      }, config);
  
      if (response.status === 201) {
        const client = response.data;
        navigate(`/clients`);
      } else {
        console.log('Failed to create client');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
  <h1 className="text-xl font-bold mb-4">Create Client</h1>
  <form className="space-y-4" onSubmit={handleSubmit}>
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1" htmlFor="companyName">Company Name:</label>
      <input className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="companyName" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1" htmlFor="companyAddress">Company Address:</label>
      <input className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="companyAddress" value={companyAddress} onChange={(event) => setCompanyAddress(event.target.value)} />
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1" htmlFor="personInCharge">Person in Charge:</label>
      <input className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="personInCharge" value={personInCharge} onChange={(event) => setPersonInCharge(event.target.value)} />
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1" htmlFor="companyEmail">Company Email:</label>
      <input className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" id="companyEmail" value={companyEmail} onChange={(event) => setCompanyEmail(event.target.value)} />
      {companyEmailError && <p className="text-red-500 text-sm mt-1">{companyEmailError}</p>}
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1" htmlFor="paymentTerm">Payment Term (Days):</label>
      <input className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" id="paymentTerm" value={paymentTerm} onChange={(event) => setPaymentTerm(event.target.value)} />
      {paymentTermError && <p className="text-red-500 text-sm mt-1">{paymentTermError}</p>}
    </div>
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit">Create</button>
  </form>
</div>

  );
}

export default CreateClient;

