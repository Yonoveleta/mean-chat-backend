const Message = require("../models/Message");

module.exports = (socket, io) => {
    socket.on("chat-message", async (message) => {
        const chatId = socket.chatId;
        const sender = socket.user.username;
        const senderId = socket.user.userId;
        
        if (!chatId || !sender || !senderId || !message) {
            return socket.emit("error", "Invalid message payload or not in a chat");
        }

        try {
            const newMessage = await Message.create({
                chat: chatId,
                sender: senderId,
                content: message
            });

            console.log(`Message from ${sender} in ${chatId}: ${message}`);

            // Emit to other users in the room
            socket.to(chatId).emit("chat-message", {
                sender,
                message,
                timestamp: newMessage.createdAt,
            });
        } catch (err) {
            console.error("Error saving message:", err);
            socket.emit("error", "Could not save message");
        }
    });
};
