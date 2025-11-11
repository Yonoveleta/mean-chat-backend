/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */


const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "secret-key";

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: secretpass
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Username already exists
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: secretpass
 *     responses:
 *       200:
 *         description: Successful login with JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Server error
 */
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
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}); 

module.exports = router;