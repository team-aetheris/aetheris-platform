const socketUtil = require("./socket");

module.exports = (io) => {
  socketUtil.init(io);

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.emit("CONNECTED", {
      type: "CONNECTED",
      message: "Connected to Aetheris realtime server",
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
