const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.signup_get = (req, res, next) => {
    res.render("signup_form", { title: "Sign Up" });
};

exports.signup_post = [
    body("username")
        .trim().isLength({ min: 1 }).escape(),
    body("password")
        .trim().isLength({ min: 1 }).escape(),
    body("confirmPassword")
        .trim().isLength({ min: 1 }).escape()
        .custom(async (value, { req }) => {
            if(value !== req.body.password) throw new Error ("Passwords must be the same");
            return true;
        }),
    async (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("ERROR!");
            return res.render("signup_form", { title: "Sign Up", passwordConfirmationError: "Passwords must be the same" });
        }

        try {
            // CHECK IF USERNAME ALREADY EXISTS
            const isUserInDB = await User.find({ "username": req.body.username });
            if(isUserInDB.length > 0) {
                return res.render("signup_form", {title: "Sign up", error: "User already exists"})
            }
            // IF USERNAME DOESN'T EXIST, PROCEED WITH REGISTERING
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if(err) return next(err);
                const user = new User({
                    username: req.body.username,
                    password: hashedPassword,
                    member: false
                }).save(err => err ? next(err) : res.redirect("/"))
            })
        }
        catch(err) {
            return next(err)
        }
    }
]