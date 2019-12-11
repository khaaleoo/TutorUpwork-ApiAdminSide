const express = require("express");
const router = express.Router();
// const passport = require('passport'); 
const userController = require('../controllers/users');

router.get('/tutorslist', userController.list("tutor"));
router.get('/tutordetail', userController.detail("tutor"));

router.get('/studentslist', userController.list("student"));
router.get('/studentdetail', userController.detail("student"));

router.post('/block', userController.block)
router.post('/unblock', userController.unblock)

module.exports = router;
