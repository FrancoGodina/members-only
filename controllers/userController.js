const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.member_get = (req, res, next) => {
    if (!res.locals.currentUser) {
        return res.redirect("/log-in");
    }
    return res.render("member_form", { title: "Become a Member", user: res.locals.currentUser  });
};