const Shipment = require("../models/Shipment");

const getMetrics = async () => {
  const totalShipments = await Shipment.countDocuments();
  const deliveredShipments = await Shipment.countDocuments({ status: "Delivered" });
  const delayedShipments = await Shipment.countDocuments({ status: "Delayed" });
  const atRiskShipments = await Shipment.countDocuments({ status: "At Risk" });
  const activeShipments = await Shipment.countDocuments({ status: { $ne: "Delivered" } });

  const avgRes = await Shipment.aggregate([
    { $group: { _id: null, avg: { $avg: "$riskScore" } } },
  ]);

  const averageRiskScore = avgRes[0] && avgRes[0].avg ? Number(avgRes[0].avg.toFixed(2)) : 0;

  return {
    totalShipments,
    activeShipments,
    delayedShipments,
    atRiskShipments,
    deliveredShipments,
    averageRiskScore,
  };
};

module.exports = {
  getMetrics,
};
