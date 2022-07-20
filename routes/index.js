var express = require('express');
var router = express.Router();
const authentication_controller = require("../controllers/authenticationController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/// ---  SIGNUP  --- ///
router.get('/sign-up', authentication_controller.signup_get);

module.exports = router;
