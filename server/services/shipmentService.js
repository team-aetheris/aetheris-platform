const Shipment = require("../models/Shipment");

const createShipment = async (payload) => {
  return Shipment.create(payload);
};

const getShipments = async () => {
  return Shipment.find().sort({ createdAt: -1 });
};

module.exports = {
  createShipment,
  getShipments,
};
