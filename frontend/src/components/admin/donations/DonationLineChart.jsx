import { CartesianGrid, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import getChartDateRange from "../../../utils/getChartDateRange";

function DonationLineChart({ donations, dateRange }) {
    const donationsByDate = {};

    
    donations.forEach((donation) => {
        const date = new Date(donation.donation_date);
        date.setHours(0, 0, 0, 0);
        const timestamp = date.getTime();
        donationsByDate[timestamp] = (donationsByDate[timestamp] || 0) + 1;
    });

    const dates = getChartDateRange(dateRange, donations);

    const chartData = dates.map((date) => ({
        day: date.toLocaleDateString("en-AU"),
        donations: donationsByDate[date.getTime()] || 0
    }));

    return (
        <div className="adminDonationChart">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                
                <CartesianGrid
                    strokeDasharray="3 3" 
                />
                <XAxis 
                    dataKey="day"
                    interval={dateRange === "7" ? 0 : dateRange === "30" ? 2 : 6}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="donations"
                    stroke="#9fa659"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ fill: "#9FA659", r: 6}}
                />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default DonationLineChart;