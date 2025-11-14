module.exports = (socket, io) => {
    socket.on("create-room", ({ roomId, roomName }) => {
        if (!roomId || !roomName) return socket.emit("error", "roomId and roomName required");

        // Optional: store room info in DB or memory
        console.log(`Room created: ${roomName} (${roomId})`);
        socket.join(roomId);
        socket.emit("room-created", { roomId, roomName });
    });
};
