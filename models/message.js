var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
    {
        title: {type: String, required:true, minLength:1, maxLength: 30},
        text: {type: String, required: true, maxLength: 1000},
        username: {type: Schema.Types.ObjectId, ref: "User", required:true },
        timestamp: {type: Date, default: Date.now, required: true }
    }
);

// Export model
module.exports = mongoose.model("Message", MessageSchema);