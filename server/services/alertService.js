const Alert = require("../models/Alert");
const socketUtil = require("../sockets/socket");

const buildAlertPayloads = (shipment) => {
  const alerts = [];

  if (shipment.riskScore > 70) {
    alerts.push({
      type: "High Risk Score",
      severity: "high",
      shipmentId: shipment.shipmentId,
      message: `Shipment risk score ${shipment.riskScore} exceeds threshold`,
    });
  }

  if (shipment.status === "Delayed") {
    alerts.push({
      type: "Delayed Shipment",
      severity: "medium",
      shipmentId: shipment.shipmentId,
      message: "Shipment is delayed and needs attention",
    });
  }

  if (shipment.status === "At Risk") {
    alerts.push({
      type: "At Risk Shipment",
      severity: "high",
      shipmentId: shipment.shipmentId,
      message: "Shipment is at risk and requires review",
    });
  }

  if (shipment.temperature > 8) {
    alerts.push({
      type: "High Temperature",
      severity: "medium",
      shipmentId: shipment.shipmentId,
      message: `Shipment temperature ${shipment.temperature}° exceeds safe range`,
    });
  }

  return alerts;
};

const createAlert = async (alertData) => {
  const alert = await Alert.create(alertData);

  try {
    const io = socketUtil.getIO();
    io.emit("alert:created", { success: true, data: alert });
  } catch (err) {
    // Continue silently if realtime is not available.
  }

  return alert;
};

const createAlertsForShipment = async (shipment) => {
  const alertPayloads = buildAlertPayloads(shipment);

  if (!alertPayloads.length) {
    return [];
  }

  const alertPromises = alertPayloads.map(createAlert);
  return Promise.all(alertPromises);
};

module.exports = {
  createAlert,
  createAlertsForShipment,
};
