
const mongoose = require("mongoose");

const sendMailSchema = new mongoose.Schema({
    to: String,
    subject: String,
    content: String,
    sentAt: {
        type: Date,
        default: Date.now,
    }
})
module.exports = mongoose.model("Email", sendMailSchema);