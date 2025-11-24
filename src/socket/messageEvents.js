const Message = require("../models/Message");

module.exports = (socket, io) => {
    socket.on("chat-message", async (message) => {
        const chatId = socket.chatId;
        const sender = socket.user.username;

        if (!chatId || !sender || !message) {
            return socket.emit("error", "Invalid message payload or not in a room");
        }

        try {
            const newMessage = await Message.create({
                chatId,
                sender,
                content: message
            });

            console.log(`Message from ${sender} in ${chatId}: ${message}`);

            // Emit to other users in the room
            socket.to(roomId).emit("chat-message", {
                sender,
                message,
                timestamp: newMessage.createdAt,
            });
        } catch(err) {
            console.error("Error saving message:", err);
            socket.emit("error", "Could not save message");
        }
    });
};
