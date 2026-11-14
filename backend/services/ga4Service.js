
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

module.exports = { getWebsiteTraffic };
