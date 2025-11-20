const Message = require("../models/Message");

module.exports = (socket, io) => {
    socket.on("chat-message", async (message) => {
        const roomId = socket.roomId;
        const sender = socket.username;

        if (!roomId || !sender || !message) {
            return socket.emit("error", "Invalid message payload or not in a room");
        }

        try {
            const newMessage = await Message.create({
                chatId: roomId,
                sender,
                content: message
            });

            console.log(`Message from ${sender} in ${roomId}: ${message}`);

            // Emit to other users in the room
            socket.to(roomId).emit("chat-message", {
                sender,
                message,
                timestamp: new Date().toISOString(),
            });
        } catch(err) {
            console.error("Error saving message:", err);
            socket.emit("error", "Could not save message");
        }
    });
};
