import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trafficData = [
    { source: "Organic Search", sessions: 120 },
    { source: "Direct", sessions: 70 },
    { source: "Organic Social", sessions: 65 },
    { source: "Referral", sessions: 50 },
    { source: "Email", sessions: 30 }
];

function TrafficSourcesChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={trafficData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                />
                <XAxis 
                    type="number"
                    allowDecimals={false}
                />

                <YAxis 
                    type="category"
                    dataKey="source"
                    width={100}
                    tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Bar
                    dataKey="sessions"
                    fill="#9fa659"
                    radius={[0, 5, 5, 0]}
                    barSize={22}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default TrafficSourcesChart