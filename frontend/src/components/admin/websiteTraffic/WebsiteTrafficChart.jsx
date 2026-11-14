import { CartesianGrid, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function WebsiteTrafficChart({ traffic = [] }) {
    const chartData = traffic.map((item) => ({
        day: `${item.date.slice(6, 8)}/${item.date.slice(4, 6)}`,
        visitors: item.activeUsers
    }));

    if (chartData.length === 0) {
        return <p>No website traffic data available.</p>;
    }


    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>

            <CartesianGrid
                strokeDasharray="3 3"
            />
            <XAxis
                dataKey="day"

            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="visitors"
                name="Active Users"
                stroke="#9fa659"
                strokeWidth={3}
                dot={{ fill: "#797641", r: 4}}
                activeDot={{ fill: "#9FA659", r: 6}}
            />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default WebsiteTrafficChart;
