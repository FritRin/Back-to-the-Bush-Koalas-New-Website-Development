
const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const analyticsClient = new BetaAnalyticsDataClient();

async function getWebsiteTraffic() {
  const propertyId = process.env.GA4_PROPERTY_ID;

  if (!propertyId) {
    throw new Error("GA4_PROPERTY_ID is not configured");
  }

  const [response] = await analyticsClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "7daysAgo",
        endDate: "yesterday"
      }
    ],
    dimensions: [{ name: "date" }],
    metrics: [
      { name: "activeUsers" },
      { name: "screenPageViews" }
    ],
    orderBys: [
      {
        dimension: {
          dimensionName: "date"
        }
      }
    ]
  });

  return (response.rows || []).map((row) => ({
    date: row.dimensionValues[0].value,
    activeUsers: Number(row.metricValues[0].value),
    pageViews: Number(row.metricValues[1].value)
  }));
}

async function getTrafficSources() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) throw new Error("GA4_PROPERTY_ID is not configured");

  const [response] = await analyticsClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: "7daysAgo", endDate: "yesterday" }],
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [{ name: "sessions" }]
  });

  return (response.rows || []).map(row => ({
    source: row.dimensionValues[0].value,
    sessions: Number(row.metricValues[0].value)
  }));
}

async function getVisitorDevices() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) throw new Error("GA4_PROPERTY_ID is not configured");

  const [response] = await analyticsClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: "7daysAgo", endDate: "yesterday" }],
    dimensions: [{ name: "deviceCategory" }],
    metrics: [{ name: "activeUsers" }]
  });

  return (response.rows || []).map(row => ({
    name: row.dimensionValues[0].value,
    value: Number(row.metricValues[0].value)
  }));
}

async function getUserEngagement() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) throw new Error("GA4_PROPERTY_ID is not configured");

  const [response] = await analyticsClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: "7daysAgo", endDate: "yesterday" }],
    metrics: [
      { name: "userEngagementDuration" },
      { name: "activeUsers" },
      { name: "engagementRate" }
    ]
  });

  const metrics = response.rows?.[0]?.metricValues || [];
  const engagementSeconds = Number(metrics[0]?.value || 0);
  const activeUsers = Number(metrics[1]?.value || 0);

  return {
    averageEngagementTimeSeconds:
      activeUsers > 0 ? engagementSeconds / activeUsers : 0,
    engagementRate: Number(metrics[2]?.value || 0)
  };
}

module.exports = {
  getWebsiteTraffic,
  getTrafficSources,
  getVisitorDevices,
  getUserEngagement
};
