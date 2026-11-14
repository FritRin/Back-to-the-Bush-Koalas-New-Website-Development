import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const deviceData = [
    { name: "Desktop", value: 55 },
    { name: "Mobile", value: 35 },
    { name: "Tablet", value: 15 },
]

const colours = ["#797641", "#9FA659", "#A6B58C"]

function VisitorDevicesChart() {
    return (
        <div className="adminTrafficChart">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={deviceData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={75}
                        label
                    >
                        {deviceData.map((entry, index) => (
                            <Cell key={entry.name} fill={colours[index % colours.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VisitorDevicesChart