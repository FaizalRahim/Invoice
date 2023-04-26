import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import validator from 'validator';


function EditClient(props) {
  const { clientId } = useParams();
  const [client, setClient] = useState({});
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [personInCharge, setPersonInCharge] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [paymentTerm, setPaymentTerm] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}`},};

  useEffect(() => {
    fetch(`/api/clients/${clientId}`, config)
      .then(response => response.json())
      .then(data => {
        setClient(data);
        setCompanyName(data.companyName);
        setCompanyAddress(data.companyAddress);
        setPersonInCharge(data.personInCharge);
        setCompanyEmail(data.companyEmail);
        setPaymentTerm(data.paymentTerm);
      })
      .catch(error => console.log(error));
  }, [clientId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validator.isEmail(companyEmail)) {
      console.log('Invalid email address');
      return;
    }

    try {
      const response = await fetch(`/api/clients/${client._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          companyAddress,
          personInCharge,
          companyEmail,
          paymentTerm,
        }),
      });
      if (response.ok) {
        navigate(`/clients`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 py-8">
  <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-2xl font-semibold text-gray-900 mb-4">Edit Client</h1>
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name:</label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">Company Address:</label>
        <input
          type="text"
          id="companyAddress"
          value={companyAddress}
          onChange={e => setCompanyAddress(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label htmlFor="personInCharge" className="block text-sm font-medium text-gray-700">Person in Charge:</label>
        <input
          type="text"
          id="personInCharge"
          value={personInCharge}
          onChange={e => setPersonInCharge(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-700">Company Email:</label>
        <input
          type="email"
          id="companyEmail"
          value={companyEmail}
          onChange={e => setCompanyEmail(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div>
        <label htmlFor="paymentTerm" className="block text-sm font-medium text-gray-700">Payment Term (Days):</label>
        <input
          type="number"
          id="paymentTerm"
          value={paymentTerm}
          onChange={e => setPaymentTerm(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
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

export default EditClient;


