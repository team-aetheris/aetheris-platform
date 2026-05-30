const Shipment = require("../models/Shipment");
const socketUtil = require("../sockets/socket");
const alertService = require("./alertService");
const riskScoring = require("./riskScoringService");

const statusTransitions = {
  Processing: ["In Transit"],
  "In Transit": ["Delayed", "Delivered"],
  Delayed: ["At Risk"],
  "At Risk": ["Delivered"],
};

const randomChoice = (items) => items[Math.floor(Math.random() * items.length)];
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const roundOne = (value) => Math.round(value * 10) / 10;

const getNextStatus = (status) => {
  const next = statusTransitions[status];
  return next ? randomChoice(next) : status;
};

const getActiveShipments = async () => {
  return Shipment.find({ status: { $ne: "Delivered" } });
};

const simulateShipmentUpdate = async (shipment) => {
  const nextStatus = getNextStatus(shipment.status);
  const riskDelta = (Math.random() * 10 - 5).toFixed(1);
  const tempDelta = (Math.random() * 4 - 2).toFixed(1);

  const newTemperature = roundOne(shipment.temperature + Number(tempDelta));
  const newRisk = riskScoring.calculateRisk({ status: nextStatus, temperature: newTemperature });

  const updated = await Shipment.findByIdAndUpdate(
    shipment._id,
    {
      status: nextStatus,
      riskScore: newRisk,
      temperature: newTemperature,
    },
    { new: true }
  );

  if (!updated) {
    return null;
  }

  try {
    const io = socketUtil.getIO();
    io.emit("shipment:updated", { success: true, data: updated });
    io.emit("risk:updated", { success: true, shipmentId: updated.shipmentId, riskScore: updated.riskScore });
  } catch (err) {
    // Silent failure if realtime is unavailable.
  }

  await alertService.createAlertsForShipment(updated);
  return updated;
};

const runSimulation = async () => {
  const activeShipments = await getActiveShipments();

  if (!activeShipments.length) {
    return;
  }

  await Promise.all(
    activeShipments.map(async (shipment) => {
      if (Math.random() > 0.45) {
        return null;
      }
      return simulateShipmentUpdate(shipment);
    })
  );
};

let simulationInterval = null;

const startSimulation = () => {
  if (simulationInterval) {
    return;
  }

  simulationInterval = setInterval(() => {
    runSimulation().catch((err) => {
      console.error("Simulation error:", err.message);
    });
  }, 15000);

  console.log("Operational simulation started: updating shipments every 15 seconds");
};

module.exports = {
  startSimulation,
};
