const express = require("express");
const router = express.Router();
// const passport = require('passport'); 
const conversationController = require('../controllers/conversations');

router.post('/messages', conversationController.detail);

module.exports = router;
