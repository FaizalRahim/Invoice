import React, { useState } from 'react';
import axios from 'axios';

const CompanyDetails = () => {
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
      const response = await axios.post('/api/company', formValues);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Create Company Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userCompanyName">User Company Name:</label>
        <input type="text" id="userCompanyName" name="userCompanyName" value={formValues.userCompanyName} onChange={handleInputChange} required />

        <label htmlFor="userCompanyAddress">User Company Address:</label>
        <input type="text" id="userCompanyAddress" name="userCompanyAddress" value={formValues.userCompanyAddress} onChange={handleInputChange} required />

        <label htmlFor="companyBankAccount">Company Bank Account:</label>
        <input type="text" id="companyBankAccount" name="companyBankAccount" value={formValues.companyBankAccount} onChange={handleInputChange} required />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CompanyDetails;
