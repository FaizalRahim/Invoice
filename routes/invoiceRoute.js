const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Create a new invoice
router.post('/', invoiceController.createInvoice);

// Get all invoice
router.get('/', invoiceController.getAllInvoices);

// Get a single invoice by id
router.get('/:id', invoiceController.getInvoiceById);

// Update an invoice by id
router.put('/:id', invoiceController.updateInvoice);

// Delete a invoice by id
router.delete('/:id', invoiceController.deleteInvoice);

module.exports = router;