import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import getChartDateRange from "../../../utils/getChartDateRange";

function DonationRevenueChart({ donations, dateRange }) {
    const donationsByDate = {};

    donations.forEach((donation) => {
        const date = new Date(donation.donation_date);
        date.setHours(0, 0, 0, 0);
        const timestamp = date.getTime();
        donationsByDate[timestamp] = (donationsByDate[timestamp] || 0) + Number(donation.amount);
    });

    const dates = getChartDateRange(dateRange, donations);

    const chartData = dates.map((date) => ({
        day: date.toLocaleDateString("en-AU"), 
        amount: donationsByDate[date.getTime()] || 0
    }));

    return (
            <div className="adminDonationChart">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="day"
                                interval={
                                    dateRange === "7" ? 0 :
                                    dateRange === "30" ? 2 :
                                    dateRange === "90" ? 6 :
                                    29
                                }
                                angle={-45}
                                textAnchor="end"
                                height={70}
                            />
                            <YAxis 
                                tickFormatter={(value) => `$${value}`}/>
                            <Tooltip 
                                formatter={(value) => [`$${Number(value).toFixed(2)}`, "Revenue"]}
                            />
                            
                            <Bar 
                                dataKey="amount"
                                name="Revenue"
                                fill="#C5CC91"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p>No donation data available.</p>
                )}
            </div>

    );
}

export default DonationRevenueChart;
                            