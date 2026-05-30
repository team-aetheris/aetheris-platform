const Shipment = require("../models/Shipment");
const Alert = require("../models/Alert");
const dashboardService = require("./dashboardService");

const answerQuery = async (rawQuery) => {
  const q = (rawQuery || "").toLowerCase();

  if (q.includes("highest risk")) {
    const top = await Shipment.findOne().sort({ riskScore: -1 }).lean();
    if (!top) return "No shipments found.";
    return `Highest risk shipment is ${top.shipmentId} with riskScore ${top.riskScore}. Status: ${top.status}.`;
  }

  if (q.includes("delayed shipments") || q.includes("delayed")) {
    const list = await Shipment.find({ status: "Delayed" }).lean();
    if (!list.length) return "There are no delayed shipments.";
    return `Delayed shipments (${list.length}): ` + list.map(s => s.shipmentId).join(", ");
  }

  if (q.includes("at risk")) {
    const list = await Shipment.find({ status: "At Risk" }).lean();
    if (!list.length) return "There are no at risk shipments.";
    return `At risk shipments (${list.length}): ` + list.map(s => s.shipmentId).join(", ");
  }

  if (q.includes("dashboard") || q.includes("summary")) {
    const metrics = await dashboardService.getMetrics();
    return `Dashboard: total ${metrics.totalShipments}, active ${metrics.activeShipments}, delayed ${metrics.delayedShipments}, at risk ${metrics.atRiskShipments}, delivered ${metrics.deliveredShipments}, avg risk ${metrics.averageRiskScore}`;
  }

  if (q.includes("active alerts") || q.includes("alerts")) {
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(10).lean();
    if (!alerts.length) return "There are no alerts.";
    return `Recent alerts (${alerts.length}): ` + alerts.map(a => `${a.type} for ${a.shipmentId}`).join("; ");
  }

  // Fallback: try to answer simple intent keywords
  if (q.includes("highest") && q.includes("risk")) {
    const top = await Shipment.findOne().sort({ riskScore: -1 }).lean();
    if (!top) return "No shipments found.";
    return `Highest risk shipment: ${top.shipmentId} (${top.riskScore})`;
  }

  return "I couldn't understand the query. Try: 'highest risk shipment', 'delayed shipments', 'at risk shipments', 'dashboard summary', or 'active alerts'.";
};

module.exports = {
  answerQuery,
};
