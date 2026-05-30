const dashboardService = require("../services/dashboardService");

const getMetrics = async (req, res) => {
  try {
    const data = await dashboardService.getMetrics();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || "Server error" });
  }
};

module.exports = {
  getMetrics,
};
