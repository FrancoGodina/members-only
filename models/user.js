var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username: {type: String, required:true, maxLength: 20},
        password: {type: String, required: true},
        member: {type: Boolean, default: false},
        admin: {type: Boolean, default: false}
    }
);

// Export model
module.exports = mongoose.model("User", UserSchema);