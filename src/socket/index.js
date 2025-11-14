const eventModules = [
    { name: "UserEvents", module: require("./userEvents") },
    { name: "MessageEvents", module: require("./messageEvents") },
    { name: "RoomEvents", module: require("./roomEvents") },
    { name: "DisconnectEvents", module: require("./disconnectEvents") }
];

function registerModules(socket, io) {
    eventModules.forEach(({ name, module }) => {
        console.log(`Registering ${name}`);
        module(socket, io);
    });
}

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected: ", socket.id);

        // Register all event modules
        registerModules(socket, io);

        socket.on("disconnect", () => {
            const username = socket.username;
            const roomId = socket.roomId;
            console.log("User disconnected: ", socket.id);

            if (username && roomId) {
                socket.to(roomId).emit("user-left", { username, socketId: socket.id })
            }
        });
    });
}