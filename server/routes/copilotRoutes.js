const express = require("express");
const router = express.Router();
const copilotController = require("../controllers/copilotController");

router.post("/query", copilotController.query);

module.exports = router;
