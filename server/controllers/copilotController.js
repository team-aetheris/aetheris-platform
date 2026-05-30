const copilotService = require("../services/copilotService");

const query = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, error: "query is required" });
    }

    const answer = await copilotService.answerQuery(query);
    return res.status(200).json({ success: true, answer });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || "Server error" });
  }
};

module.exports = {
  query,
};
