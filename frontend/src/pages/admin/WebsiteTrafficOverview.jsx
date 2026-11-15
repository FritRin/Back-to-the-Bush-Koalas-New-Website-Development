import VisitorDevicesChart from "../../components/admin/websiteTraffic/VisitorDevicesChart";
import WebsiteTrafficChart from "../../components/admin/websiteTraffic/WebsiteTrafficChart";
import TrafficSourcesChart from "../../components/admin/websiteTraffic/TrafficSourcesChart";
import UserEngagementCard from "../../components/admin/websiteTraffic/UserEngagementCard";
import { useEffect, useState } from "react";
import { getWebsiteTraffic } from "../../services/ga4Service";

function WebsiteTrafficOverview() {
    const [trafficData, setTrafficData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadTraffic() {
            try {
                const result = await getWebsiteTraffic();
                setTrafficData(result.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadTraffic();
    }, []);

    return (
        <div className="adminDashboard">
            <div className="adminDashboardTop">
                <div className="adminDashboardOverview">
                    <h2>Website Traffic Overview</h2>
                    <p>Monitor website traffic and visitor activity</p>
                </div>
            </div>

            <div className="adminTrafficChartsSection">
                <div className="adminTrafficMainGrid">
                    <div className="adminTrafficAnalytics">
                        <h3>Website Traffic Over Time</h3>
                        <div className="adminTrafficChart">
                            {loading ? (
                                <p>Loading website traffic...</p>
                            ) : error ? (
                                 <p>Unable to load website traffic: {error}</p>
                            ) : (
                                 <WebsiteTrafficChart traffic={trafficData} />
                            )}
                        </div>
                    </div>

                    <UserEngagementCard />

                </div>

                <div className="adminTrafficSecondaryGrid">
                    <div className="adminTrafficAnalytics">
                        <h3>Traffic Sources</h3>

                        <div className="adminTrafficChart">
                            <TrafficSourcesChart />
                        </div>
                    </div>

                    <div className="adminTrafficAnalytics">
                        <h3>Visitor Devices</h3>

                        <div className="adminTrafficChart">
                            <VisitorDevicesChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default WebsiteTrafficOverview;
