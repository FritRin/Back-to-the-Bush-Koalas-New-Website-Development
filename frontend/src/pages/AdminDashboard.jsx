import StatisticCard from "../components/StatisticCard";

function AdminDashboard() {
  return (
    <div className="pageContainer"> 
        <h1>Admin Dashboard</h1>

        <div className="dashboardOverview">
            <h2>Overview</h2>
            
            <StatisticCard title="Title" value="--" />
            <StatisticCard title="Title" value="--" />
            <StatisticCard title="Title" value="--" />
            <StatisticCard title="Title" value="--" />
        </div>

        <div className="dashboardAnalytics">
            <h2>Analytics</h2>
            
            <div className="donationAnalytics">
                <h3>Analytics 1 placeholder</h3>
                <p>Recharts placeholder</p>
            </div>

            <div className="donationAnalytics">
                <h3>Analytics 2 placeholder</h3>
                <p>Recharts placeholder</p>
            </div>

            <div className="donationAnalytics">
                <h3>Analytics 3 placeholder</h3>
                <p>Recharts placeholder</p>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard;