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
    <div className="space-y-2">
      <label htmlFor="productName" className="text-lg font-medium">
        Product Name:
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={e => setProductName(e.target.value)}
          className="block w-full pr-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
    <div className="space-y-2">
      <label htmlFor="unitPrice" className="text-lg font-medium">
        Unit Price:
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type="number"
          id="unitPrice"
          value={unitPrice}
          onChange={e => setUnitPrice(e.target.value)}
          className={`${unitPriceError ? 'border-red-500' : ''} block w-full pr-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {unitPriceError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm1-9a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {unitPriceError && (
        <p className="mt-2 text-sm text-red-600">{unitPriceError}</p>
      )}
    </div>
    <button
      type="submit"
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Save
    </button>
  </form>
</div>


  );
}

export default EditProduct;
