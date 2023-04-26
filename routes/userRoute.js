const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Create a user product
router.post('/', userController.createUser);

// Delete a user by id
router.delete('/:id', auth, userController.deleteUser);

// Login user
router.post('/login', userController.loginUser);


module.exports = router;