import React, { useState } from 'react';
import axios from 'axios';

const CompanyDetails = () => {
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}`}};

  const [formValues, setFormValues] = useState({
    UserCompanyName: '',
    userCompanyAddress: '',
    companyBankAccount: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/company', formValues, config);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
  <h2 className="text-lg font-bold mb-4">Create Company Details</h2>
  <form className="space-y-4" onSubmit={handleSubmit}>
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1" htmlFor="userCompanyName">User Company Name:</label>
      <input className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="userCompanyName" name="userCompanyName" value={formValues.userCompanyName} onChange={handleInputChange} required />
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1" htmlFor="userCompanyAddress">User Company Address:</label>
      <input className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="userCompanyAddress" name="userCompanyAddress" value={formValues.userCompanyAddress} onChange={handleInputChange} required />
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1" htmlFor="companyBankAccount">Company Bank Account:</label>
      <input className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="companyBankAccount" name="companyBankAccount" value={formValues.companyBankAccount} onChange={handleInputChange} required />
    </div>
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit">Create</button>
  </form>
</div>

  );
};

export default CompanyDetails;
