exports.index = async (req, res, next) => {
    try {
        return res.render("index", { title: "AnonPosting", user: req.user })
    }
    catch(err) {
        return next(err)
    }
}