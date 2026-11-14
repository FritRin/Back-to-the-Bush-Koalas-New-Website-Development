import { useState, useEffect } from "react";

import StatisticCard from "../../components/admin/donations/StatisticDisplay";
import DonationLineChart from "../../components/admin/donations/DonationLineChart";
import DonationPieChart from "../../components/admin/donations/DonationPieChart";
import TotalDonations from "../../components/admin/donations/TotalDonations";
import AdminDateFilter from "../../components/admin/donations/AdminDateFilter";
import DonationRevenueChart from "../../components/admin/donations/DonationRevenueChart";

import { getAllDonations } from "../../services/donationService";
import filterDonationsByDate from "../../utils/filterDonationsByDate";
import AverageDonations from "../../components/admin/donations/AverageDonations";
import TotalRevenue from "../../components/admin/donations/TotalRevenue";

function DonationsOverview() {
    const [dateRange, setDateRange] = useState("30");
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDonations() {
            try {
                const data = await getAllDonations();
                setDonations(data.data);
            } catch (error) {
                console.error("Error fetching donations:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDonations();
    }, []);

    // Filer donations whenever the dateRange is changed
    const filteredDonations = filterDonationsByDate(donations, dateRange);

    // Sort donations newest first
    const sortedDonations = [...filteredDonations].sort(
        (a, b) => new Date(b.donation_date) - new Date(a.donation_date)
    );

    return (
        <div className="adminDashboard">
            <div className="adminDashboardTop">
                <div className="adminDashboardOverview">
                    <h2>Overview</h2>
                    <p>Monitor donation activity</p>
                </div>

                <AdminDateFilter
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                />
            </div>
            
            <div className="adminStatisticWrapper">
                <TotalDonations donations={filteredDonations} />
                <AverageDonations donations={filteredDonations} />
                <TotalRevenue donations={filteredDonations} />
            </div>

            <div className="adminChartsSection">
                <div className="adminAnalyticsGrid">
                    <div className="adminDonationAnalytics">
                        <h3>Total Donations Over Time</h3>
                        <DonationLineChart 
                            donations={filteredDonations}
                            dateRange={dateRange}
                        />
                    </div>

                    <div className="adminDonationAnalytics">
                        <h3>Donation Revenue Over Time</h3>
                        <DonationRevenueChart 
                            donations={filteredDonations}
                            dateRange={dateRange} />
                    </div>
                    
                    <div className="adminDonationAnalytics">
                        <h3>Payment Method Breakdown</h3>
                        <DonationPieChart donations={filteredDonations} />
                    </div>

                    <div className="adminDonationAnalytics">
                        <h3>Placeholder</h3>
                     
                    </div>
                </div>
            </div>
            <div className="adminDonationsSection">
                <div className="adminDonationsHeading">
                    <div>
                        <h3 className="adminSectionTitle">Donations</h3>
                        <p>Donations made by users</p>
                    </div>

                    <span className="adminDonationCount">
                        {filteredDonations.length} Donations
                    </span>
                </div>

                <div className="adminDonationsTableWrapper">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <table className="adminDonationsTable">
                            <thead>
                                <tr>
                                    <th>Donation ID</th>
                                    <th>Customer ID</th>
                                    <th>Date</th>
                                    <th>Payment Method</th>
                                    <th>Amount</th>
                                    <th>Currency</th>
                                    <th>Transaction Reference</th>
                                </tr>
                            </thead>

                        <tbody>
                            {sortedDonations.map((donation) => (
                                <tr key={donation.donation_id}>
                                    <td>{donation.donation_id}</td>
                                    <td>{donation.customer_id}</td>
                                    <td>{new Date(donation.donation_date).toLocaleDateString("en-AU")}</td>
                                    <td>{donation.payment_method}</td>
                                    <td>{Number(donation.amount).toFixed(2)}</td>
                                    <td>{donation.currency}</td>
                                    <td>{donation.transaction_reference}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}

                    {!loading && filteredDonations.length === 0 && (
                        <p>No donations found for this date range.</p>
                    )}
                </div>
            </div>

    </div>
  )
}

export default DonationsOverview; 