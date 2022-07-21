var express = require('express');
var router = express.Router();
const authentication_controller = require("../controllers/authenticationController");
const index_controller = require("../controllers/indexController");

/* GET home page. */
router.get("/", index_controller.index);

/// ---  SIGN UP  --- ///
router.get('/sign-up', authentication_controller.signup_get);
router.post("/sign-up", authentication_controller.signup_post);

/// ---  LOG IN  --- ///
router.get("/log-in", authentication_controller.login_get);
router.post("/log-in", authentication_controller.login_post)

module.exports = router;
