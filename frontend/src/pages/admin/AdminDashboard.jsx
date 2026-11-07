import StatisticCard from "../../components/admin/StatisticDisplay";
import DonationLineChart from "../../components/admin/DonationLineChart";
import DonationPieChart from "../../components/admin/DonationPieChart";
import TotalKoalas from "../../components/admin/TotalKoalas";

function AdminDashboard() {
  return (
    <div className="adminDashboard">
        <div className="adminDashboardOverview">
                <h2>Overview</h2>
            </div>
            
            <div className="adminSectionContainer">
                <h3 className="adminSectionTitle">Statistics</h3>

                <div className="adminStatisticWrapper">
                    <StatisticCard title="Total Donations" value="$--" />
                    <TotalKoalas /> 
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