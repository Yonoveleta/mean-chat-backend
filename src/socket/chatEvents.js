const Chat = require("../models/Chat");

module.exports = (socket, io) => {
    socket.on("join-chat", async ({ chatId }) => {
        if (!chatId) return socket.emit("error", "chatId required");

        // Join the socket.io room named after the chat
        socket.join(chatId);
        socket.chatId = chatId;

        console.log(`User ${socket.user.username} joined chat ${chatId}`);

        // Notify other users in the chat
        socket.to(chatId).emit("user-joined", {
            username: socket.user.username,
            socketId: socket.id
        });
    });

    socket.on("leave-chat", () => {
        const chatId = socket.chatId;
        if (!chatId) return;

        socket.leave(chatId);
        console.log(`User ${socket.user.username} left chat ${chatId}`);

        socket.to(chatId).emit("user-left", {
            username: socket.user.username,
            socketId: socket.id
        });

        delete socket.chatId;
    });
};

