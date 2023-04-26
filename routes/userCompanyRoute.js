const express = require('express');
const router = express.Router();
const userCompanyController = require('../controllers/userCompanyController');
const auth = require('../middleware/auth');

// Create a new invoice
router.post('/', auth , userCompanyController.createUserCompanyDetails);

// Get all invoice
router.get('/', auth , userCompanyController.getAllUserCompanyDetails);

// Get a single invoice by id
router.get('/:id', auth , userCompanyController.getUserCompanyDetailsById);

// Update an invoice by id
router.put('/:id', auth , userCompanyController.updateUserCompanyDetails);

// Delete a invoice by id
router.delete('/:id', auth , userCompanyController.deleteUserCompanyDetails);

module.exports = router;

