import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mongoose from 'mongoose';

function EditInvoice(props) {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState({});
  const [companyName, setCompanyName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [lineItems, setLineItems] = useState([]);
  const [loading, setLoading] = useState(true); // add loading state
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}`},};

  useEffect(() => {
    fetch(`/api/invoices/${invoiceId}`, config)
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
        setLoading(false); // update loading state
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
    if (!invoice._id) return; 
    try {
      const response = await fetch(`/api/invoices/${invoice._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName:  companyName.companyName ,
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
        const updatedInvoice = await response.json();
        setInvoice(updatedInvoice);
        navigate(`/invoices`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  

  return (
    <div className="p-4 max-w-md mx-auto bg-base-100 rounded-md shadow-md">
  <h1 className="mb-4 text-3xl font-bold text-center">Edit Invoice</h1>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block mb-2 font-semibold" htmlFor="companyName">Company Name:</label>
      <input
        className="w-full py-2 px-4 bg-gray-200 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        type="text"
        id="companyName"
        value={companyName}
        onChange={e => setCompanyName(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label className="block mb-2 font-semibold" htmlFor="invoiceNumber">Invoice Number:</label>
      <input
        className="w-full py-2 px-4 bg-gray-200 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        type="number"
        id="invoiceNumber"
        value={invoiceNumber}
        onChange={e => setInvoiceNumber(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label className="block mb-2 font-semibold" htmlFor="dueDate">Due Date:</label>
      <input
        className="w-full py-2 px-4 bg-gray-200 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        type="date"
        id="dueDate"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Line Items:</label>
      {lineItems.map((item, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2 font-semibold" htmlFor={`product-${index}`}>Product:</label>
          <input
            className="w-full py-2 px-4 bg-gray-200 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            id={`product-${index}`}
            value={item.product.productName}
            onChange={(e) =>
              handleLineItemChange(index, 'product', { ...item.product, productName: e.target.value })
            }
          />
          <label className="block mb-2 font-semibold" htmlFor={`quantity-${index}`}>Quantity:</label>
          <input
            className="w-full py-2 px-4 bg-gray-200 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="number"
            id={`quantity-${index}`}
            value={item.quantity}
            onChange={(e) => handleLineItemChange(index, 'quantity', Number(e.target.value))}
          />
        </div>
      ))}
    </div>
    <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200" type="submit">Save</button>
  </form>
</div>


  );
}

export default EditInvoice;



