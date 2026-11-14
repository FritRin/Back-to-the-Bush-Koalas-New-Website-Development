import { useState, useEffect } from "react";

import StatisticCard from "../../components/admin/StatisticDisplay";
import DonationLineChart from "../../components/admin/DonationLineChart";
import DonationPieChart from "../../components/admin/DonationPieChart";
import TotalKoalas from "../../components/admin/TotalKoalas";
import TotalDonations from "../../components/admin/TotalDonations";
import AdminDateFilter from "../../components/admin/AdminDateFilter";

import { getAllDonations } from "../../services/donationService";
import filterDonationsByDate from "../../utils/filterDonationsByDate";

import WebsiteTrafficChart from "../../components/admin/WebsiteTrafficChart";
import { getWebsiteTraffic } from "../../services/ga4Service";

function AdminDashboard() {
    const [dateRange, setDateRange] = useState("30");
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [traffic, setTraffic] = useState([]);
    const [trafficLoading, setTrafficLoading] = useState(true);
    const [trafficError, setTrafficError] = useState("");

    useEffect(() => {
        async function fetchDonations() {
            try {
                const data = await getAllDonations();
                setDonations(data.data);
            } catch (error) {
                console.error("Error fetching donations:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDonations();
    }, []);
    useEffect(() => {
        async function fetchTraffic() {
            try {
                const response = await getWebsiteTraffic();
                setTraffic(response.data);
            } catch (error) {
                console.error("Error fetching GA4 traffic:", error);
                setTrafficError("Unable to load website traffic.");
            } finally {
                setTrafficLoading(false);
            }
        }
        fetchTraffic();
    }, []);

    // Filer donations whenever the dateRange is changed
    const filteredDonations = filterDonationsByDate(donations, dateRange);

    return (
    <div className="adminDashboard">
        <div className="adminDashboardOverview">
                <h2>Overview</h2>
            </div>
            
            <div className="adminSectionContainer">
                <h3 className="adminSectionTitle">Statistics</h3>

                <div className="adminStatisticWrapper">
                    <TotalDonations donations={filteredDonations} />
                    <TotalKoalas /> 
                    <StatisticCard title="Title" value="--" />
                    <StatisticCard title="Title" value="--" />
            </div>
        </div>

        <div className="adminSectionContainer">
            <h3 className="adminSectionTitle">Analytics</h3>

            <AdminDateFilter
                dateRange={dateRange}
                setDateRange={setDateRange}
            />

            <div className="adminAnalyticsGrid">
                <div className="adminDonationAnalytics">
                    <h3>Total Donations Over Time</h3>
                    <DonationLineChart donations={filteredDonations} />
                </div>

                <div className="adminDonationAnalytics">
                    <h3>Payment Method Breakdown</h3>
                    <DonationPieChart donations={filteredDonations} />
                </div>

                <div className="adminDonationAnalytics">
                    <h3>Analytics 3 placeholder</h3>
                    <p>Recharts placeholder</p>
                </div>

                <div className="adminDonationAnalytics">
                     <h3>Website Traffic Over Time</h3>
                     {trafficLoading ? (
                         <p>Loading website traffic...</p>
                     ) : trafficError ? (
                     <p>{trafficError}</p>
                     ) : (
                         <WebsiteTrafficChart traffic={traffic} />
                     )}
                </div>

            </div>
        </div>
    </div>
  )
}

export default AdminDashboard;
