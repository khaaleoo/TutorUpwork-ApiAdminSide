const express = require("express");
const router = express.Router();
const contractController = require('../controllers/contracts');

router.get('/list', contractController.list)
router.post('/update', contractController.updateInfo)

module.exports = router;
