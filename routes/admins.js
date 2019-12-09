const express = require("express");
const router = express.Router();
// const passport = require('passport'); 
const adminController = require('../controllers/admins');

router.post('/login', adminController.login);
router.get('/list', adminController.list)
router.post('/register', adminController.create);
router.delete('/remove/:id*?', adminController.remove);
router.post('/changepassword', adminController.changePassword)
router.post('/updateinfo', adminController.updateInfo)

module.exports = router;
