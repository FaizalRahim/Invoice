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
    <div>
      <h1>Edit Client</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="companyAddress">Company Address:</label>
          <input
            type="text"
            id="companyAddress"
            value={companyAddress}
            onChange={e => setCompanyAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="personInCharge">Person in Charge:</label>
          <input
            type="text"
            id="personInCharge"
            value={personInCharge}
            onChange={e => setPersonInCharge(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="companyEmail">Company Email:</label>
          <input
            type="email"
            id="companyEmail"
            value={companyEmail}
            onChange={e => setCompanyEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="paymentTerm">Payment Term (Days):</label>
          <input
            type="number"
            id="paymentTerm"
            value={paymentTerm}
            onChange={e => setPaymentTerm(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditClient;


