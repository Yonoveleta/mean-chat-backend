const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register new User
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ error: "Username already exists" });

        // Hash password
        const passwordHash = await User.hashPassword(password);

        // Create and save user
        const newUser = new User({ username, passwordHash });
        await newUser.save();

        res.status(201).json({ message: "User registered succesfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Login User
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: "Invalid username or password" });

        // Check password
        const validPassword = await user.isValidPassword(password);
        if (!validPassword) return res.status(401).json({ error: "Invalid username or password" });

        // Create JWT Token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;