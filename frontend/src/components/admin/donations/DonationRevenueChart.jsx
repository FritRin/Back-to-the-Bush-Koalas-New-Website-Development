import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function DonationRevenueChart({ donations }) {
    const donationsByDate = {};

    donations.forEach((donation) => {
        const date = new Date(donation.donation_date)
            .toLocaleDateString("en-AU", { timeZone: "UTC" });

        donationsByDate[date] = (donationsByDate[date] || 0) + Number(donation.amount);
    });

        const chartData = Object.entries(donationsByDate)
            .map(([date, amount]) => ({
                day: date,
                amount: amount
            }))  
            .sort((a, b) => {
                const [dayA, monthA, yearA] = a.day.split("/");
                const [dayB, monthB, yearB] = b.day.split("/");
                return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
            });  

    return (
            <div className="adminDonationChart">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="day"
                            />
                            <YAxis 
                                tickFormatter={(value) => `$${value}`}/>
                            <Tooltip 
                                formatter={(value) => [`$${Number(value).toFixed(2)}`, "Revenue"]}
                            />
                            
                            <Area
                                type="monotone"
                                dataKey="amount"
                                name="Revenue"
                                stroke="#9fa659"
                                fill="#C5CC91"
                                fillOpacity={0.5}
                                strokeWidth={3}
                                activeDot={{ r: 5 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <p>No donation data available.</p>
                )}
            </div>

    );
}

export default DonationRevenueChart;
                            