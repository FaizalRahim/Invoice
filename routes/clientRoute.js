const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Create a new client
router.post('/clients', clientController.createClient);

// Get all clients
router.get('/clients', clientController.getClients);

// Get a single client by id
router.get('/clients/:id', clientController.getClientById);

// Update a client by id
router.put('/clients/:id', clientController.updateClient);

// Delete a client by id
router.delete('/clients/:id', clientController.deleteClient);

module.exports = router;
