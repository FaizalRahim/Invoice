import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/products/${id}`, config);
      if (response.status === 200) {
        setProducts(products.filter((product) => product._id !== id));
      } else {
        console.log('Failed to delete product');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const product = await axios.get(`/api/products/${id}`, config);
      const updatedProduct = { ...product.data };
      const response = await axios.put(`/api/products/${id}`, updatedProduct, config);
      if (response.status === 200) {
        const updatedProduct = response.data;
        console.log(updatedProduct);
        navigateTo(`/Product/edit/${id}`);
      } else {
        console.log('Failed to update product');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
  <h1 className="text-2xl font-bold mb-4">Products</h1>
  <ul className="divide-y divide-gray-200">
    {products.map(product => (
      <li key={product._id} className="py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <strong className="text-lg">{product.productName}</strong>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600" onClick={() => handleDelete(product._id)}>Delete</button>
          <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600" onClick={() => handleEdit(product._id)}>Edit</button>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
}

export default ProductList;