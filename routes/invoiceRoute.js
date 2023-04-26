const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const auth =require('../middleware/auth')

// Create a new invoice
router.post('/', auth , invoiceController.createInvoice);

// Get all invoice
router.get('/', auth , invoiceController.getAllInvoices);

// Get a single invoice by id
router.get('/:id', auth , invoiceController.getInvoiceById);

// Update an invoice by id
router.put('/:id', auth , invoiceController.updateInvoice);

// Delete a invoice by id
router.delete('/:id', auth , invoiceController.deleteInvoice);

module.exports = router;