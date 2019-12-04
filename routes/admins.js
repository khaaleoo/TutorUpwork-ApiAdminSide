const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admins');

router.post('/register', adminController.create);

module.exports = router;