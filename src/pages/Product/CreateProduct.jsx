import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

function CreateProduct(props) {
  const [productName, setProductName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [productNameError, setProductNameError] = useState('');
  const [unitPriceError, setUnitPriceError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}`},'Content-Type': 'application/json'};

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input values
    if (!validator.isLength(productName, { min: 1, max: 255 })) {
      setProductNameError('Product name must be between 1 and 255 characters');
      return;
    } else {
      setProductNameError('');
    }

    if (!validator.isNumeric(unitPrice.toString())) {
      setUnitPriceError('Invalid unit price');
      return;
    } else {
      setUnitPriceError('');
    }

    // Send data to server
    try {
      const response = await axios.post(`/api/products`, {
        productName,
        unitPrice
      }, config);
  
      if (response.status === 201) {
        const product = response.data;
        navigate('/products');
      } else {
        console.log('Failed to create product');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
  <h1 className="text-xl font-bold mb-4">Create Product</h1>
  <form className="space-y-4" onSubmit={handleSubmit}>
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1" htmlFor="productName">Product Name:</label>
      <input className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="productName" value={productName} onChange={(event) => setProductName(event.target.value)} />
      {productNameError && <p className="text-red-500 text-sm mt-1">{productNameError}</p>}
    </div>
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1" htmlFor="unitPrice">Unit Price:</label>
      <input className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" id="unitPrice" value={unitPrice} onChange={(event) => setUnitPrice(event.target.value)} />
      {unitPriceError && <p className="text-red-500 text-sm mt-1">{unitPriceError}</p>}
    </div>
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit">Create</button>
  </form>
</div>

  );
}

export default CreateProduct;
