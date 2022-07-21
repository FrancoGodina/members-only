const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.member_get = (req, res, next) => {
    if (!res.locals.currentUser) {
        return res.redirect("/log-in");
    }
    return res.render("member_form", { title: "Become a Member", user: res.locals.currentUser  });
};

exports.member_post = [
    body("passcode")
        .trim().isLength({ min: 1 }).escape().withMessage("Passcode must be specified"),
    
    async(req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.render("member_form", {title: "Become a Member", user: res.locals.currentUser, errors: errors.array() });
        }
        else if(req.body.passcode != process.env.MEMBER_PASSCODE) {
            return res.render("member_form", {title: "Become a Member", user: res.locals.currentUser, passcodeError: "Wrong password" });
        }

        const user = new User(res.locals.currentUser);
        user.member = true;

        await User.findByIdAndUpdate(res.locals.currentUser._id, user, {}, (err) => {
            if(err) return next(err);
            return res.redirect("/member");
        })
    }
]

exports.admin_get = (req, res, next) => {
    if (!res.locals.currentUser) {
        return res.redirect("/log-in");
    }
    return res.render("admin_form", { title: "Become an Admin", user: res.locals.currentUser  });
}