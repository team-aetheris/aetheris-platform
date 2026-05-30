/**
 * Simple rule-based analysis service for shipments.
 * Returns an analysis object: { summary, recommendation, severity }
 */

const SEVERITY_SCORE = {
  low: 1,
  medium: 2,
  high: 3,
};

const pickSeverity = (scores) => {
  const max = Math.max(...scores);
  if (max >= SEVERITY_SCORE.high) return "high";
  if (max >= SEVERITY_SCORE.medium) return "medium";
  return "low";
};

const analyzeShipment = (shipment) => {
  const issues = [];
  const { status, riskScore = 0, temperature = 0 } = shipment || {};

  if (status === "At Risk") {
    issues.push({
      summary: "Shipment at risk",
      recommendation: "Immediate intervention: inspect cargo and prioritize recovery",
      severity: SEVERITY_SCORE.high,
    });
  }

  if (status === "Delayed") {
    issues.push({
      summary: "Shipment delayed",
      recommendation: "Review route and prioritize delivery",
      severity: SEVERITY_SCORE.medium,
    });
  }

  if (temperature >= 12) {
    issues.push({
      summary: "High temperature detected",
      recommendation: "Check refrigeration systems and expedite delivery",
      severity: SEVERITY_SCORE.high,
    });
  } else if (temperature >= 8) {
    issues.push({
      summary: "Elevated temperature",
      recommendation: "Monitor temperature and verify cooling",
      severity: SEVERITY_SCORE.medium,
    });
  }

  if (riskScore >= 80) {
    issues.push({
      summary: "Very high risk score",
      recommendation: "Review shipment details, consider rerouting or inspection",
      severity: SEVERITY_SCORE.high,
    });
  } else if (riskScore >= 50) {
    issues.push({
      summary: "Elevated risk score",
      recommendation: "Monitor shipment and consider escalation",
      severity: SEVERITY_SCORE.medium,
    });
  }

  if (!issues.length) {
    return {
      summary: "No immediate issues detected",
      recommendation: "Continue monitoring",
      severity: "low",
    };
  }

  const severity = pickSeverity(issues.map((i) => i.severity));

  // Prefer the highest-severity issue for summary and recommendation
  const primary = issues.find((i) => i.severity === SEVERITY_SCORE.high) || issues[0];

  return {
    summary: primary.summary,
    recommendation: primary.recommendation,
    severity,
  };
};

module.exports = {
  analyzeShipment,
};
