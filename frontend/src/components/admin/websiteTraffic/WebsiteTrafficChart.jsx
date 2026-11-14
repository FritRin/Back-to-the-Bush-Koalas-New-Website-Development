import { CartesianGrid, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function WebsiteTrafficChart() {
    const chartData = [
        { day: 'Mon', visitors: 20 },
        { day: 'Tue', visitors: 35 },
        { day: 'Wed', visitors: 14 },
        { day: 'Thu', visitors: 21 },
        { day: 'Fri', visitors: 52 },
        { day: 'Sat', visitors: 30 },
        { day: 'Sun', visitors: 20 } 
    ];


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