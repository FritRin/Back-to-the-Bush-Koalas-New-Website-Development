import StatisticCard from "../components/StatisticDisplay";
import DonationLineChart from "../components/DonationLineChart";
import DonationPieChart from "../components/DonationPieChart";

function AdminDashboard() {
  return (
    <div className="adminDashboard">
        <div className="adminSectionContainer adminDashboardOverview">
                <h2>Overview</h2>
            </div>
            
            <div className="adminSectionContainer">
                <h3 className="adminSectionTitle">Statistics</h3>

                <div className="adminStatisticWrapper">
                    <StatisticCard title="Total Donations" value="$--" />
                    <StatisticCard title="Title" value="--" />
                    <StatisticCard title="Title" value="--" />
                    <StatisticCard title="Title" value="--" />
            </div>
        </div>

        <div className="adminSectionContainer">
            <h3 className="adminSectionTitle">Analytics</h3>

            <div className="adminAnalyticsGrid">
                <div className="adminDonationAnalytics">
                    <h3>Donations Over Time Placeholder</h3>
                    <DonationLineChart />
                </div>

                <div className="adminDonationAnalytics">
                    <h3>Payment Methods placeholder</h3>
                    <DonationPieChart />
                </div>

                <div className="adminDonationAnalytics">
                    <h3>Analytics 3 placeholder</h3>
                    <p>Recharts placeholder</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default AdminDashboard; 