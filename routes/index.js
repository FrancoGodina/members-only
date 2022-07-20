var express = require('express');
var router = express.Router();
const authentication_controller = require("../controllers/authenticationController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/// ---  SIGN UP  --- ///
router.get('/sign-up', authentication_controller.signup_get);
router.post("/sign-up", authentication_controller.signup_post);

/// ---  LOG IN  --- ///
router.get("/log-in", authentication_controller.login_get);

module.exports = router;
