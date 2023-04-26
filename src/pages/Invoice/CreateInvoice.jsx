import React, { useState, useEffect } from 'react';
import axios from 'axios';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

function CreateInvoice(props) {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyEmail, setComapnyEmail] = useState(''); 
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [paymentTerm, setPaymentTerm] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [lineItems, setLineItems] = useState([]);
  const [clients, setClients] = useState([]);
  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState([]);
  const [unitPrice, setUnitPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productQuantityError, setproductQuantityError] = useState('');
  const [invoiceNumberError, setinvoiceNumberError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}`},};

  useEffect(() => {
    const fetchClients = async () => {
      try {
        
        const response = await axios.get('/api/clients', config);
        if (response.status === 200) {
          setClients(response.data);
        } else {
          console.log('Failed to fetch clients');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products', config);
        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.log('Failed to fetch products');
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchProducts();
  }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input values

    if (!validator.isNumeric(invoiceNumber)) {
      setinvoiceNumberError('Invalid invoice number');
      return;
    } else {
      setinvoiceNumberError('');
    }


    const payload = {
      companyName,
      invoiceNumber,
      dueDate,
      lineItems,
      companyEmail
    };
  
    // Log the payload
    console.log('Payload:', payload);
  

    // Send data to server
  try {
    const response = await axios.post(`/api/invoices`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

      if (response.status === 201) {
        const invoice = response.data;
        navigate('/invoices');
      } else {
        console.log('Failed to create invoice');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddItem = () => {
    
    if (!validator.isInt(productQuantity.toString(), { min: 1 })) {
      setproductQuantityError('Product quantity must not be 0');
      return; 
    } else {
      setproductQuantityError('');
    }
    
    const selectedProduct = products.find(product => product.productName === productName);
    if (selectedProduct) {
      setLineItems([...lineItems, { product: selectedProduct._id, quantity: productQuantity, unitPrice }]);
      setUnitPrice(0);
      setProductName('');
      setProductQuantity(0);
    }
  };
  
  
  
  const handleCompanyNameChange = (event) => {
    const selectedCompanyName = event.target.value;
    const selectedClient = clients.find(client => client._id === selectedCompanyName);
    if (selectedClient) {
      setCompanyName(selectedCompanyName);
      setCompanyAddress(selectedClient.companyAddress);
      setComapnyEmail(selectedClient.companyEmail);
      setPaymentTerm(selectedClient.paymentTerm);
      const today = new Date().toISOString().substr(0, 10);
      const dueDate = new Date(new Date(today).setDate(new Date(today).getDate() + selectedClient.paymentTerm)).toISOString().substr(0, 10);
      setInvoiceDate(today);
      setDueDate(dueDate);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleInvoiceDateChange = (event) => {
    const selectedInvoiceDate = event.target.value;
    const today = new Date().toISOString().substr(0, 10);
  
    if (selectedInvoiceDate < today) {
      alert('Invoice date cannot be in the past');
      return;
    }
  
    const dueDate = new Date(new Date(selectedInvoiceDate).setDate(new Date(selectedInvoiceDate).getDate() + paymentTerm)).toISOString().substr(0, 10);
    setInvoiceDate(selectedInvoiceDate);
    setDueDate(dueDate);
  };
  


  const handleProductNameChange = (event) => {
    const selectedProductName = event.target.value;
    const selectedProduct = products.find(product => product.productName === selectedProductName);
    if (selectedProduct) {
      setProductName(selectedProductName);
      setUnitPrice(selectedProduct.unitPrice); 
    } else {
      setProductName('');
      setUnitPrice(0); 
    }
  };
  

return (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl mb-4">Create Invoice</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-wrap">
        <label htmlFor="companyName" className="w-1/3">Company Name:</label>
        <select id="companyName" value={companyName} onChange={handleCompanyNameChange} className="w-2/3 border p-1">
          <option value="">Select a client</option>
          {clients.map(client => (
            <option key={client._id} value={client._id}>{client.companyName}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap">
        <label htmlFor="companyAddress" className="w-1/3">Company Address:</label>
        <textarea id="companyAddress" value={companyAddress} readOnly className="w-2/3 border p-1" />
      </div>
      <div className="flex flex-wrap">
        <label htmlFor="companyEmail" className="w-1/3">Company Email:</label>
        <textarea id="companyEmail" value={companyEmail} readOnly className="w-2/3 border p-1" />
      </div>
      <div className="flex flex-wrap">
        <label htmlFor="invoiceNumber" className="w-1/3">Invoice Number:</label>
        <input type="number" id="invoiceNumber" value={invoiceNumber} onChange={(event) => setInvoiceNumber(event.target.value)} className="w-2/3 border p-1" />
        {invoiceNumberError && <p className="text-red-500 text-sm mt-1">{invoiceNumberError}</p>}
      </div>
      <div className="flex flex-wrap">
        <label htmlFor="invoiceDate" className="w-1/3">Invoice Date:</label>
        <input type="date" id="invoiceDate" value={invoiceDate} onChange={handleInvoiceDateChange} className="w-2/3 border p-1" />
      </div>
      <div className="flex flex-wrap">
        <label htmlFor="paymentTerm" className="w-1/3">Payment Term:</label>
        <textarea id="paymentTerm" value={paymentTerm} readOnly className="w-2/3 border p-1" />
      </div>
      <div className="flex flex-wrap">
        <label htmlFor="dueDate" className="w-1/3">Due Date:</label>
        <textarea id="dueDate" value={formatDate(dueDate)} readOnly className="w-2/3 border p-1" />

      </div>
      <div>
        <div className="flex flex-wrap">
          <label htmlFor="productName" className="w-1/3">Product Name:</label>
          <select id="productSelect" value={productName} onChange={handleProductNameChange} className="w-2/3 border p-1">
            <option value="">Select a Product</option>
            {products.map(product => (
              <option key={product._id} value={product.productName}>{product.productName}</option>
            ))}
          </select>
        </div>
        <div       className="flex flex-wrap">
        <label htmlFor="unitPrice" className="w-1/3">Unit Price $:</label>
        <textarea id="unitPrice" value={unitPrice} readOnly className="w-2/3 border p-1" />
      </div>
      <div className="flex flex-wrap">
        <label htmlFor="productQuantity" className="w-1/3">Product Quantity:</label>
        <input type="number" id="productQuantity" value={productQuantity} onChange={(event) => setProductQuantity(event.target.value)} className="w-2/3 border p-1" />
        {productQuantityError && <p className="text-red-500 text-sm mt-1">{productQuantityError}</p>}
      </div>
      <button type="button" onClick={handleAddItem} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Add Item</button>
    </div>
    <label htmlFor="lineItems" className="block">Line Items:</label>
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-2 py-1">Product Name</th>
          <th className="border border-gray-300 px-2 py-1">Quantity</th>
          <th className="border border-gray-300 px-2 py-1">Unit Price</th>
        </tr>
      </thead>
      <tbody>
        {lineItems.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
            <td className="border border-gray-300 px-2 py-1">{products.find(product => product._id === item.product)?.productName}</td>
            <td className="border border-gray-300 px-2 py-1">{item.quantity}</td>
            <td className="border border-gray-300 px-2 py-1">{item.unitPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Create</button>
  </form>
</div>
);
}
export default CreateInvoice;
