import { CartesianGrid, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import getChartDateRange from "../../../utils/getChartDateRange";

function PaymentLineChart({ payments, dateRange }) {
    const paymentsByDate = {};

    
    payments.forEach((payment) => {
        const date = new Date(payment.date);
        date.setHours(0, 0, 0, 0);
        const timestamp = date.getTime();
        paymentsByDate[timestamp] = (paymentsByDate[timestamp] || 0) + 1;
    });

    const dates = getChartDateRange(dateRange, payments);

    const chartData = dates.map((date) => ({
        day: date.toLocaleDateString("en-AU"),
        payments: paymentsByDate[date.getTime()] || 0
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
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="payments"
                    name="Payments"
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

export default PaymentLineChart;