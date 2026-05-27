const shipmentService = require("../services/shipmentService");

const createShipment = async (req, res) => {
  try {
    const shipment = await shipmentService.createShipment(req.body);
    return res.status(201).json({ success: true, data: shipment });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "shipmentId already exists" });
    }
    return res.status(500).json({ success: false, error: error.message || "Server error" });
  }
};

const getShipments = async (req, res) => {
  try {
    const shipments = await shipmentService.getShipments();
    return res.status(200).json({ success: true, data: shipments });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || "Server error" });
  }
};

module.exports = {
  createShipment,
  getShipments,
};
