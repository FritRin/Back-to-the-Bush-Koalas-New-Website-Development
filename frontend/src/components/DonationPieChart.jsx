import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const placeholderData = [
        { PaymentMethod: "Give Now", value: 4 },
        { PaymentMethod: "PayPal", value: 10 }
];

const Colours = ["#9FA659", "#797641"]

function DonationPieChart() {
    return (
        <div className="donationChart">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={placeholderData}
                        dataKey="value"
                        nameKey="PaymentMethod"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {placeholderData.map((entry, index) => (
                            <Cell key={entry.PaymentMethod} fill={Colours[index % Colours.length]} />
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