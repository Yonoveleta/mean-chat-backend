module.exports = (socket, io) => {
    const { username, roomId } = socket;
    if (username && roomId) {
        socket.to(roomId).emit("user-left", { username, socketId: socket.id });
        console.log(`${username} left room ${roomId}`);
    }
};
