const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const auth =require('../middleware/auth')

// Create a new client
router.post('/', auth , clientController.createClient);

// Get all clients
router.get('/', auth , clientController.getClients);

// Get a single client by id
router.get('/:id', auth , clientController.getClientById);

// Update a client by id
router.put('/:id', auth , clientController.updateClient);

// Delete a client by id
router.delete('/:id', auth , clientController.deleteClient);

module.exports = router;
