
import { CartesianGrid, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function DonationLineChart() {

    const placeholderData = [
        { day: "Mon", donations: 2 },
        { day: "Tue", donations: 3 },
        { day: "Wed", donations: 5 },
        { day: "Thu", donations: 3 },
        { day: "Fri", donations: 4 },
        { day: "Sat", donations: 7 },
        { day: "Sun", donations: 8 }
    ];

    return (
        <div className="adminDonationChart">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={placeholderData}>
                
                <CartesianGrid
                    strokeDasharray="3 3" 
                />
                <XAxis 
                    dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="donations"
                    stroke="#9fa659"
                    strokeWidth={3}
                    dot={{ fill: "#797641, r: 4"}}
                    activeDot={{ fill: "#9FA659", r: 6}}
                />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default DonationLineChart;