const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

exports.create_message_get = (req, res , next) => {
    if(!res.locals.currentUser) {
        return res.redirect("/log-in");
    }
    res.render("message_form", { title: "Write your message" , user: res.locals.currentUser });
}