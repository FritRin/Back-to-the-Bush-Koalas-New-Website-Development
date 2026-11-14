import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function DonationPieChart({ donations }) {
    // Group donations by payment method
    const donationsByMethod = {};

    donations.forEach((donation) => {
        const method = donation.payment_method;

        donationsByMethod[method] = (donationsByMethod[method] || 0) + 1;
    });
        

    // Convert the grouped donations into Recharts data
    const chartData = Object.entries(donationsByMethod)
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
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={entry.name} fill={Colours[index % Colours.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DonationPieChart