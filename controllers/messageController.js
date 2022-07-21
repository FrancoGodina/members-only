const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

exports.create_message_get = (req, res , next) => {
    if(!res.locals.currentUser) {
        return res.redirect("/log-in");
    }
    res.render("message_form", { title: "Write your message" , user: res.locals.currentUser });
}

exports.create_message_post = [
    body("messageTitle")
        .trim().isLength({ min: 1 }).escape(),
    body("messageText")
        .trim().isLength({ min: 1 }).escape(),

    async (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.render("message_form", { title: "Write your message", errors: errors.array() });
        }

        const message = new Message({
            username: req.user._id,
            title: req.body.messageTitle,
            text: req.body.messageText,
            timestamp: Date.now()
        })

        message.save(err => err ? next(err) : res.redirect("/"))
    }
];

exports.delete_message_post = (req, res, next) => {
    Message.findByIdAndRemove(req.body.messageId, function deleteMessage(err) {
        if(err) return next(err)
        return res.redirect("/");
    });
};