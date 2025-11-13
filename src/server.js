// Imports
const express = require("express");
const http = require("http");
const mongoose = require("mongoose")
const {Server} = require("socket.io")
const path = require("path")
const socketHandler = require("./socket")

// Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Routes
const authRouter = require("./routes/auth");

// Create express app and server
const app = express();
const server = http.createServer(app);

// MongoDB init
const MONGO_URI = "mongodb://127.0.0.1:27017/chatdb";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB locally"))
.catch(err => console.error("MongoDB connection error:", err));

// Socket.io config
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Swagger config
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Chat App API",
            version: "1.0.0",
            description: "API documentation for the Chat App"
        }
    },
    apis: [path.join(__dirname, "/routes/*.js")]
}

const specs = swaggerJsdoc(options);

// Set up socket logic
socketHandler(io);

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Routing
app.use("/auth", authRouter);

// Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Sever is running on http://0.0.0.0:${PORT}`);
});