let ioInstance = null;

module.exports = {
  init: (io) => {
    ioInstance = io;
    return ioInstance;
  },
  getIO: () => {
    if (!ioInstance) {
      throw new Error("Socket.io not initialized. Call init(io) first.");
    }
    return ioInstance;
  },
};
