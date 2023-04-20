const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create a new product
router.post('/products', productController.createProduct);

// Get all products
router.get('/products', productController.getAllProducts);

// Get a single product by id
router.get('/products/:id', productController.getProductById);

// Update a product by id
router.put('/products/:id', productController.updateProduct);

// Delete a product by id
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;