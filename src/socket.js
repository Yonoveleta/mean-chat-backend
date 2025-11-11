module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected: ", socket.id);

        socket.on("join-room", ({ roomId, username }) => {
            if (!roomId || !username) {
                return socket.emit("error", "roomId and username are required");
            }

            socket.join(roomId);
            socket.username = username;
            socket.roomId = roomId;

            console.log(`Socket ${socket.id} joined room ${roomId}`);

            // Notify to others in the room
            socket.to(roomId).emit("user-joined", { username, socketId: socket.id });
        });

        socket.on("chat-message", (message) => {
            const roomId = socket.roomId;
            const sender = socket.username;

            if (!roomId || !sender || !message) {
                return socket.emit("error", "Invalid message payload or not in a room");
            }

            console.log(`Message from ${sender} in ${roomId}: ${message}`);

            socket.to(roomId).emit("chat-message", {
                sender,
                message,
                timestamp: new Date().toISOString(),
            });
        });

        socket.on("disconnect", () => {
            const username = socket.username;
            const roomId = socket.roomId;
            console.log("User disconnected: ", socket.id);

            if(username && roomId) {
                socket.to(roomId).emit("user-left", {username, socketId: socket.id})
            }
        });
    });
}