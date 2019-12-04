const express = require("express");
const router = express.Router();
// const passport = require('passport'); 
const adminController = require('../controllers/admins');

router.post('/register', adminController.create);
router.post('/login', adminController.login);
router.get('/list', adminController.list)

module.exports = router;
