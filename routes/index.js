var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("your application is running on port 8080");
  res.send("ApiAdminSide");
});

module.exports = router;
