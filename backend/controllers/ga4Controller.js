
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

async function getTrafficSources(req, res) {
  try {
    const data = await ga4Service.getTrafficSources();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("GA4 traffic sources error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve traffic sources"
    });
  }
}

async function getVisitorDevices(req, res) {
  try {
    const data = await ga4Service.getVisitorDevices();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("GA4 visitor devices error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve visitor devices"
    });
  }
}

async function getUserEngagement(req, res) {
  try {
    const data = await ga4Service.getUserEngagement();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("GA4 engagement error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve user engagement"
    });
  }
}

module.exports = {
  getWebsiteTraffic,
  getTrafficSources,
  getVisitorDevices,
  getUserEngagement
};
