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
    <div className="px-4 py-8 max-w-xl mx-auto space-y-4">
  <h1 className="text-2xl font-bold">Edit Product</h1>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="productName" className="text-lg font-medium">
        Product Name:
      </label>
      <input
        type="text"
        id="productName"
        value={productName}
        onChange={e => setProductName(e.target.value)}
        className="w-full py-2 px-3 mt-1 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
    <div>
      <label htmlFor="unitPrice" className="text-lg font-medium">
        Unit Price:
      </label>
      <input
        type="number"
        id="unitPrice"
        value={unitPrice}
        onChange={e => setUnitPrice(e.target.value)}
        className={`${unitPriceError ? 'border-red-500' : ''} w-full py-2 px-3 mt-1 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50`}
      />
      {unitPriceError && (
        <p className="text-red-500 text-sm mt-1">{unitPriceError}</p>
      )}
    </div>
    <button
      type="submit"
      className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50"
    >
      Save
    </button>
  </form>
</div>

  );
}

export default EditProduct;
