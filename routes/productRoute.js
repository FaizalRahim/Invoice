const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

// Create a new product
router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Get a single product by id
router.get('/:id', productController.getProductById);

// Update a product by id
router.put('/:id', productController.updateProduct);

// Delete a product by id
router.delete('/:id', productController.deleteProduct);

module.exports = router;