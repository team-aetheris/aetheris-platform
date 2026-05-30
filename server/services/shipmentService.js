const Shipment = require("../models/Shipment");
const socketUtil = require("../sockets/socket");

const createShipment = async (payload) => {
  const shipment = await Shipment.create(payload);

  try {
    const io = socketUtil.getIO();
    io.emit("shipment:created", { success: true, data: shipment });
  } catch (err) {
    // Socket not initialized or emit failed — fail silently for now
    // This keeps API behavior unchanged if realtime infra isn't available
  }

  return shipment;
};

const getShipments = async () => {
  return Shipment.find().sort({ createdAt: -1 });
};

module.exports = {
  createShipment,
  getShipments,
};
