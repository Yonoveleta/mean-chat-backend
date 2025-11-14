module.exports = (socket, io) => {
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
};
