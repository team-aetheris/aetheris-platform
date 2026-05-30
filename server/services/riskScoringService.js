/**
 * Risk Scoring Service
 * Calculates riskScore based on status and temperature.
 */

const clamp = (value, min = 0, max = 100) => Math.min(Math.max(Math.round(value), min), max);

const statusScore = (status) => {
  switch (status) {
    case "Processing":
      return 10;
    case "In Transit":
      return 20;
    case "Delayed":
      return 40;
    case "At Risk":
      return 60;
    default:
      return 0;
  }
};

const temperatureScore = (temperature) => {
  if (typeof temperature !== "number") return 0;
  if (temperature >= 12) return 30;
  if (temperature >= 8) return 20;
  return 0;
};

const calculateRisk = ({ status, temperature }) => {
  const s = statusScore(status);
  const t = temperatureScore(temperature);
  return clamp(s + t, 0, 100);
};

module.exports = {
  calculateRisk,
};
