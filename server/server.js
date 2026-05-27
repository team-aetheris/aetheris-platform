require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const shipmentRoutes = require("./routes/shipmentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/shipments", shipmentRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Aetheris Backend Running",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("Starting server...");

    await connectDB();

    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
  }
};

startServer();