var express = require('express');
var router = express.Router();
const authentication_controller = require("../controllers/authenticationController");
const index_controller = require("../controllers/indexController");
const message_controller = require("../controllers/messageController");
const user_controller = require("../controllers/userController");

/// ---  HOMEPAGE  --- ///
router.get("/", index_controller.index);
router.post("/", message_controller.delete_message_post)


/// ---  SIGN UP  --- ///
router.get('/sign-up', authentication_controller.signup_get);
router.post("/sign-up", authentication_controller.signup_post);

/// ---  LOG IN  --- ///
router.get("/log-in", authentication_controller.login_get);
router.post("/log-in", authentication_controller.login_post);
router.get("/log-out", authentication_controller.logout_get);

/// ---  CREATE MESSAGE  --- ///
router.get("/create-message", message_controller.create_message_get);
router.post("/create-message", message_controller.create_message_post);

/// ---  MEMBERSHIP  --- ///
router.get("/member", user_controller.member_get);
router.post("/member", user_controller.member_post);

/// ---  ADMIN  --- ///
router.get("/admin", user_controller.admin_get);
router.post("/admin", user_controller.admin_post);

module.exports = router;