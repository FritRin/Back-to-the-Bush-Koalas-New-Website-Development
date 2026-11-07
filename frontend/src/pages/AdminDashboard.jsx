import StatisticCard from "../components/StatisticDisplay";
import DonationLineChart from "../components/DonationLineChart";
import DonationPieChart from "../components/DonationPieChart";

function AdminDashboard() {
  return (
    <div className="pageContainer"> 

        <div className="dashboardOverview">
            <h2>Overview</h2>
            
            <div className="adminStatisticContainer">
                <StatisticCard title="Total Donations" value="$--" />
                <StatisticCard title="Title" value="--" />
                <StatisticCard title="Title" value="--" />
                <StatisticCard title="Title" value="--" />
            </div>
        </div>

        <div className="dashboardAnalytics">
            <h2>Analytics</h2>

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