import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function PaymentTypePieChart({ payments }) {
    // Group PaymentTypes by payment type
    const paymentsByType = {};

    payments.forEach((payment) => {
        const type = payment.type;

        paymentsByType[type] = (paymentsByType[type] || 0) + 1;
    });
   

    // Convert the grouped Payments into Recharts data
    const chartData = Object.entries(paymentsByType)
        .map(([type, count]) => ({
            name: type,
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
                        innerRadius={65}
                        outerRadius={95}
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

export default PaymentTypePieChart