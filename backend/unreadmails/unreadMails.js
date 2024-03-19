
const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    to: String,
    subject: String,
    content: String,
    isRead: {
        type: Boolean,
        default: false // By default, emails are marked as unread
    }
});

module.exports = mongoose.model("unReadmail", emailSchema);