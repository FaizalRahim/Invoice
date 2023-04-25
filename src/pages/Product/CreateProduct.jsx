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
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
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
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input type="text" id="productName" value={productName} onChange={(event) => setProductName(event.target.value)} />
          {productNameError && <p className="error">{productNameError}</p>}
        </div>
        <div>
          <label htmlFor="unitPrice">Unit Price:</label>
          <input type="number" id="unitPrice" value={unitPrice} onChange={(event) => setUnitPrice(event.target.value)} />
          {unitPriceError && <p className="error">{unitPriceError}</p>}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateProduct;
