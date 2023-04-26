const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

// Create a new product
router.post('/', auth , productController.createProduct);

// Get all products
router.get('/', auth , productController.getAllProducts);

// Get a single product by id
router.get('/:id', auth , productController.getProductById);

// Update a product by id
router.put('/:id', auth , productController.updateProduct);

// Delete a product by id
router.delete('/:id', auth , productController.deleteProduct);

module.exports = router;