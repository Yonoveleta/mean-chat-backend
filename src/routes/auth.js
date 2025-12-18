const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} = require("../utils/tokenUtils");

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
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Set HttpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/auth/refresh"
        });

        res.json({ accessToken });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/refresh", (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ error: "No refresh token" });

        const decoded = verifyRefreshToken(token);

        const newAccessToken = generateAccessToken({
            _id: decoded.userId,
            username: decoded.username
        });

        return res.json({ accessToken: newAccessToken });

    } catch (err) {
        return res.status(403).json({ error: "Invalid refresh token" });
    }
});

module.exports = router;