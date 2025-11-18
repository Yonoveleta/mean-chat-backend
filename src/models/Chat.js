const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    isGroup: { type: Boolean, default: false },
    members: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        validate: [arr => arr.length > 1, "Chat must have at least 2 members"]
    },
    name: String, // Only for groups
    createdAt: { type: Date, default: Date.now }
});

chatSchema.index({ members: 1 });

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;