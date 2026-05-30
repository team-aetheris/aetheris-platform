const Shipment = require("../models/Shipment");
const socketUtil = require("../sockets/socket");
const alertService = require("./alertService");
const riskScoring = require("./riskScoringService");

const createShipment = async (payload) => {
  // Calculate riskScore automatically
  const riskScore = riskScoring.calculateRisk({
    status: payload.status || "Processing",
    temperature: payload.temperature || 0,
  });

  const toCreate = Object.assign({}, payload, { riskScore });

  const shipment = await Shipment.create(toCreate);

  try {
    const io = socketUtil.getIO();
    io.emit("shipment:created", { success: true, data: shipment });
    io.emit("risk:updated", { success: true, shipmentId: shipment.shipmentId, riskScore: shipment.riskScore });
  } catch (err) {
    // Socket not initialized or emit failed — fail silently for now
  }

  await alertService.createAlertsForShipment(shipment);

  return shipment;
};

const getShipments = async () => {
  return Shipment.find().sort({ createdAt: -1 });
};

module.exports = {
  createShipment,
  getShipments,
};
