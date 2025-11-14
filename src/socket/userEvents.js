module.exports = (socket, io) => {
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
}
