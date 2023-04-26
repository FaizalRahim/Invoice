import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EmailForm(props) {
  const navigateTo = useNavigate();
  const { companyEmail } = useParams();
  const [message, setMessage] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState('');
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}`},};

  useEffect(() => {
    // Fetch invoices from API
    fetch('/api/invoices', config)
      .then((response) => response.json())
      .then((data) => {
        // Set invoices state with received data
        setInvoices(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedInvoice) {
      fetch(`/api/invoices/${selectedInvoice}`, config)
        .then((response) => response.json())
        .then((data) => {
          setInvoiceDetails(data);
          console.log(invoiceDetails); 
        })
        .catch((error) => console.log(error));
    } else {
      setInvoiceDetails(null);
    }
  }, [selectedInvoice]);

  const handleSendEmail = async (event) => {
    event.preventDefault();

    if (!invoiceDetails) {
      console.log('No client details found');
      return;
    }

    try {
      const response = await fetch('/api/email/', config, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyEmail, message, invoiceNumber: selectedInvoice, client: invoiceDetails }),
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.log('Error sending email');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectInvoice = (event) => {
    setSelectedInvoice(event.target.value);
  };

  return (
    <div>
      <h1>Send Invoice Email</h1>
      <form onSubmit={handleSendEmail}>
        <label>
          Invoice:
          <select value={selectedInvoice} onChange={handleSelectInvoice}>
            <option value="">Select an invoice</option>
            {invoices.map((invoice) => (
              <option key={invoice._id} value={invoice._id}>
                {invoice.invoiceNumber}
              </option>
            ))}
          </select>
        </label>
        {invoiceDetails && (
          <>
            <p>Company Name: {invoiceDetails.companyName}</p>
            <p>Person in Charge: {invoiceDetails.personInCharge}</p>
            <p>Company Email: {invoiceDetails.companyEmail}</p>
          </>
        )}
        <br />
        <label>
          Message:
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
        </label>
        <br />
        <button type="submit" disabled={!selectedInvoice}>
          Send Email
        </button>
      </form>
    </div>
  );
}

export default EmailForm;
