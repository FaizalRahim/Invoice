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
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <strong>{product.productName}</strong> 
            <button onClick={() => handleDelete(product._id)}>Delete</button>
            <button onClick={() => handleEdit(product._id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;