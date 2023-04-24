const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const multer = require('multer');

// Set up storage for uploaded files using multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('invoice'), emailController.sendEmail);

module.exports = router;

