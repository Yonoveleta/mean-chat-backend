const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const auth = require("../middleware/auth");

router.use(auth);

router.post("/", async (req, res) => {
    try {
        const { members, name, isGroup } = req.body;

        const chat = new Chat({
            members,
            name,
            isGroup,
        });

        await chat.save();

        res.status(201).json(chat);
    } catch (err) {
        console.error("Error creating chat: ", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;