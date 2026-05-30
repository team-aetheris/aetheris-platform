const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    shipmentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    origin: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Processing", "In Transit", "Delayed", "Delivered", "At Risk"],
      default: "Processing",
    },
    riskScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    temperature: {
      type: Number,
      required: true,
    },
    analysis: {
      summary: {
        type: String,
      },
      recommendation: {
        type: String,
      },
      severity: {
        type: String,
      },
    },
    eta: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Shipment", shipmentSchema);
