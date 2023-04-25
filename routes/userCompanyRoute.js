const express = require('express');
const router = express.Router();
const userCompanyController = require('../controllers/userCompanyController');

// Create a new invoice
router.post('/', userCompanyController.createUserCompanyDetails);

// Get all invoice
router.get('/', userCompanyController.getAllUserCompanyDetails);

// Get a single invoice by id
router.get('/:id', userCompanyController.getUserCompanyDetailsById);

// Update an invoice by id
router.put('/:id', userCompanyController.updateUserCompanyDetails);

// Delete a invoice by id
router.delete('/:id', userCompanyController.deleteUserCompanyDetails);

module.exports = router;

