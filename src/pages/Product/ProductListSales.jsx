import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductListSales() {
  const [products, setProducts] = useState([]);
  const navigateTo = useNavigate();
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}`},};


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
  
        const response = await axios.get('/api/products', config);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchProducts();
  }, []);



  return (
    <div className="p-4">
  <h1 className="text-2xl font-bold mb-4">Products</h1>
  <ul className="divide-y divide-gray-200">
    {products.map(product => (
      <li key={product._id} className="py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <strong className="text-lg">{product.productName}</strong>
          <strong className="text-lg">{product.unitPrice}</strong>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
}

export default ProductListSales;