import React, { useState } from 'react';
import axios from 'axios';


function CreateProduct(props) {
  const [productName, setProductName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Pending validation


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
        props.onProductCreated(product);
      } else {
        console.log('Failed to create product');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Create Client</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input type="text" id="productName" value={productName} onChange={(event) => setProductName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="unitPrice">Unit Price:</label>
          <input type="number" id="unitPrice" value={unitPrice} onChange={(event) => setUnitPrice(event.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateProduct;