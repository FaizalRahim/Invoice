import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditInvoice(props) {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState({});
  const [companyName, setCompanyName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [lineItems, setLineItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/invoices/${invoiceId}`)
      .then(response => response.json())
      .then(data => {
        setInvoice(data);
        setCompanyName(data.companyName);
        setInvoiceNumber(data.invoiceNumber);
        setDueDate(data.dueDate);
        setLineItems(data.lineItems);
      })
      .catch(error => console.log(error));
  }, [invoiceId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/invoices/${invoice._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          invoiceNumber,
          dueDate,
          lineItems,
        }),
      });
      if (response.ok) {
        navigate(`/invoices`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Edit Invoice</h1>
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
          <label htmlFor="invoiceNumber">Invoice Number:</label>
          <input
            type="number"
            id="invoiceNumber"
            value={invoiceNumber}
            onChange={e => setInvoiceNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lineItems">Line Items (JSON):</label>
          <textarea
            id="lineItems"
            value={JSON.stringify(lineItems)}
            onChange={e => setLineItems(JSON.parse(e.target.value))}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditInvoice;
