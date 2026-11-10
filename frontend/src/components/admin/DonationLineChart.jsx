import { useState, useEffect } from "react"; 
import { CartesianGrid, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, darkTheme } from 'recharts'

import { getAllDonations } from '../../services/donationService';

function DonationLineChart() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchDonations() {
            try {
                const data = await getAllDonations();
                const donationsByDate = {};
                data.data.forEach((donation) => {
                    const date = new Date(donation.donation_date)
                        .toLocaleDateString("en-AU", { timeZone: "UTC"});
                    
                      donationsByDate[date] = (donationsByDate[date] || 0) + 1;

            });

            // Convert the grouped donations into Recharts data
            const formattedData = Object.entries(donationsByDate)
                .map(([date, donations]) => ({
                    day: date,
                    donations: donations
                }))
                .sort((a, b) => {
                    const [dayA, monthA, yearA] = a.day.split("/");
                    const [dayB, monthB, yearB] = b.day.split("/");
                    return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
                }); 
            
                console.log(formattedData);
            setChartData(formattedData);

        } catch (error) {
            console.error("Error fetching donations", error);
        } finally {
            setLoading(false);
        }
    }
    
    fetchDonations();
    }, []);

    if (loading) {
        return <p>Loading donation data</p>;
    }

    return (
        <div className="adminDonationChart">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                
                <CartesianGrid
                    strokeDasharray="3 3" 
                />
                <XAxis dataKey="day" />
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