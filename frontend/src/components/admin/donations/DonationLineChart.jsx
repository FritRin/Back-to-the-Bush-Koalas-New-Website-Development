import { CartesianGrid, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function DonationLineChart({ donations }) {
    const donationsByDate = {};

    
    donations.forEach((donation) => {
        const date = new Date(donation.donation_date)
            .toLocaleDateString("en-AU", { timeZone: "UTC"});
        
        donationsByDate[date] = (donationsByDate[date] || 0) + 1;
    });
        
            // Convert the grouped donations into Recharts data
            const chartData = Object.entries(donationsByDate)
                .map(([date, count]) => ({
                    day: date,
                    donations: count
                }))
                .sort((a, b) => {
                    const [dayA, monthA, yearA] = a.day.split("/");
                    const [dayB, monthB, yearB] = b.day.split("/");
                    return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
                }); 

    return (
        <div className="adminDonationChart">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                
                <CartesianGrid
                    strokeDasharray="3 3" 
                />
                <XAxis 
                    dataKey="day"
                    interval={0}
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
                    dot={{ fill: "#797641", r: 4}}
                    activeDot={{ fill: "#9FA659", r: 6}}
                />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default DonationLineChart;