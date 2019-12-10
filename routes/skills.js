const express = require("express");
const router = express.Router();
const skillController = require('../controllers/skills');

router.get('/list', skillController.list)
// router.post('/register', skillController.create);
// router.delete('/remove/:id*?', skillController.remove);
// router.post('/updateinfo', skillController.updateInfo)

module.exports = router;
