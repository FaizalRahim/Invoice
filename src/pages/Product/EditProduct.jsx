import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import validator from 'validator';

function EditProduct(props) {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [productName, setProductName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [unitPriceError, setUnitPriceError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}`},};

  useEffect(() => {
    fetch(`/api/products/${productId}`, config)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setProductName(data.productName);
        setUnitPrice(data.unitPrice);
      })
      .catch(error => console.log(error));
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input values
    if (!validator.isNumeric(unitPrice.toString())) {
      setUnitPriceError('Invalid unit price');
      return;
    } else {
      setUnitPriceError('');
    }

    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 
           Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          unitPrice,
        }),
      });
      if (response.ok) {
        navigate(`/products`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={e => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="unitPrice">Unit Price:</label>
          <input
            type="number"
            id="unitPrice"
            value={unitPrice}
            onChange={e => setUnitPrice(e.target.value)}
          />
          {unitPriceError && <p className="error">{unitPriceError}</p>}
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditProduct;
