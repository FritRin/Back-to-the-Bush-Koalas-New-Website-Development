
const ga4Service = require("../services/ga4Service");

async function getWebsiteTraffic(req, res) {
  try {
    const traffic = await ga4Service.getWebsiteTraffic();

    return res.status(200).json({
      success: true,
      data: traffic
    });
  } catch (error) {
    console.error("GA4 traffic error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve website traffic data"
    });
  }
}

module.exports = { getWebsiteTraffic };
