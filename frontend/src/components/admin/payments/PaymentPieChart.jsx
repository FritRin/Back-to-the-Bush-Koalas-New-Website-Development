import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function PaymentPieChart({ payments }) {
    // Group donations by payment method
    const paymentsByMethod = {};

    payments.forEach((payment) => {
        const method = payment.payment_method;

        paymentsByMethod[method] = (paymentsByMethod[method] || 0) + 1;
    });
        

    // Convert the grouped payments into Recharts data
    const chartData = Object.entries(paymentsByMethod)
        .map(([method, count]) => ({
            name: method,
            value: count
        }));

    const Colours = ["#9FA659", "#797641"]
    
    return (
        <div className="adminDonationChart">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="38%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={entry.name} fill={Colours[index % Colours.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PaymentPieChart