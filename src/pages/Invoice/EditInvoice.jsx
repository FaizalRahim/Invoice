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
        setCompanyName(data.companyName.companyName || '');
        setInvoiceNumber(data.invoiceNumber || '');
        setDueDate(data.dueDate ? new Date(data.dueDate).toISOString().substring(0, 10) : '');
        setLineItems(data.lineItems.map(item => ({
          product: {
            ...item.product,
            _id: item.product._id || '',
            productName: item.product.productName || '',
            unitPrice: item.product.unitPrice || 0,
            __v: item.product.__v || 0
          },
          quantity: item.quantity || 0,
          _id: item._id || ''
        })));
      })
      .catch(error => console.log(error));
  }, [invoiceId]);
  

  const handleLineItemChange = (index, key, value) => {
    const updatedLineItems = [...lineItems];
    updatedLineItems[index][key] = value;
    setLineItems(updatedLineItems);
  };
  

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
          lineItems: lineItems.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            _id: item._id
          })),
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
        <label>Line Items:</label>
        {lineItems.map((item, index) => (
          <div key={index}>
            <label htmlFor={`product-${index}`}>Product:</label>
            <input
              type="text"
              id={`product-${index}`}
              value={item.product.productName}
              onChange={(e) =>
                handleLineItemChange(index, 'product', { ...item.product, productName: e.target.value })
              }
            />
            <label htmlFor={`quantity-${index}`}>Quantity:</label>
            <input
              type="number"
              id={`quantity-${index}`}
              value={item.quantity}
              onChange={(e) => handleLineItemChange(index, 'quantity', Number(e.target.value))}
            />
          </div>
        ))}
      </div>
      <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditInvoice;



