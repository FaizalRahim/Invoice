import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('/api/clients');
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
        const response = await axios.get('/api/products');
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

    // Pending validation

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
        'Content-Type': 'application/json'
      }
    });

      if (response.status === 201) {
        const invoice = response.data;
        props.onInvoiceCreated(invoice);
      } else {
        console.log('Failed to create invoice');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddItem = () => {
    const selectedProduct = products.find(product => product.productName === productName);
    if (selectedProduct) {
      setLineItems([...lineItems, { product: selectedProduct._id, quantity: productQuantity, unitPrice }]);
      setUnitPrice(selectedProduct.unitPrice);
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

  const handleInvoiceDateChange = (event) => {
    const selectedInvoiceDate = event.target.value;
    const dueDate = new Date(new Date(selectedInvoiceDate).setDate(new Date(selectedInvoiceDate).getDate() + paymentTerm)).toISOString().substr(0, 10);
    setInvoiceDate(selectedInvoiceDate);
    setDueDate(dueDate);
  };

  useEffect(() => {
    const today = new Date().toISOString().substr(0, 10);
    setDueDate(today);
  }, []);

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
    <div>
      <h1>Create Invoice</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <select id="companyName" value={companyName} onChange={handleCompanyNameChange}>
            <option value="">Select a client</option>
            {clients.map(client => (
              <option key={client._id} value={client._id}>{client.companyName}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="companyAddress">Company Address:</label>
          <textarea id="companyAddress" value={companyAddress} readOnly />
        </div>
        <div>
          <label htmlFor="companyEmail">Company Email:</label>
          <textarea id="companyEmail" value={companyEmail} readOnly />
        </div>
        <div>
          <label htmlFor="invoiceNumber">Invoice Number:</label>
          <input type="number" id="invoiceNumber" value={invoiceNumber} onChange={(event) => setInvoiceNumber(event.target.value)} />
        </div>
        <div>
          <label htmlFor="invoiceDate">Invoice Date:</label>
          <input type="date" id="invoiceDate" value={invoiceDate} onChange={handleInvoiceDateChange} />
        </div>
        <div>
          <label htmlFor="paymentTerm">Payment Term:</label>
          <textarea id="paymentTerm" value={paymentTerm} readOnly />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input type="date" id="dueDate" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
        </div>
        <div>
          <label htmlFor="lineItems">Line Items:</label>
          <table>
            <thead>
              <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.productName}</td>
                  <td>{item.productQuantity}</td>
                  <td>{item.unitPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <label htmlFor="productName">Product Name:</label>
            <select id="productSelect" value={productName} onChange={handleProductNameChange}>
              <option value="">Select a Product</option>
              {products.map(product => (
                <option key={product._id} value={product.productName}>{product.productName}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="unitPrice">unit Price $:</label>
            <textarea id="unitPrice" value={unitPrice} readOnly />
          </div>
          <div>
            <label htmlFor="productQuantity">Product Quantity:</label>
            <input type="number" id="productQuantity" value={productQuantity} onChange={(event) => setProductQuantity(event.target.value)} />
          </div>
          <button type="button" onClick={handleAddItem}>Add Item</button>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
export default CreateInvoice;
