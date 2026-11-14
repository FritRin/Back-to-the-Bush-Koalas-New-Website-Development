
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";

function WebsiteTrafficChart({ traffic = [] }) {

    const chartData = traffic.map((item) => ({
        date: `${item.date.slice(6, 8)}/${item.date.slice(4, 6)}`,
        activeUsers: item.activeUsers,
        pageViews: item.pageViews
    }));

    if (chartData.length === 0) {
        return <p>No website traffic data available.</p>;
    }

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="activeUsers"
                        name="Active Users"
                        stroke="#2563eb"
                    />
                    <Line
                        type="monotone"
                        dataKey="pageViews"
                        name="Page Views"
                        stroke="#16a34a"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default WebsiteTrafficChart;
