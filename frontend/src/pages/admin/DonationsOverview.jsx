// This page is a copy of the original DonationsOverview, with a section for total Payments
// The total Payments is currently just donations and adoptions
// as the wishlist purchases are currently just going in to the donations table.

import { useState, useEffect } from "react";

// Existing donations components
import DonationLineChart from "../../components/admin/donations/DonationLineChart";
import DonationPieChart from "../../components/admin/donations/DonationPieChart";
import DonationRevenueChart from "../../components/admin/donations/DonationRevenueChart";
import AdminDateFilter from "../../components/admin/donations/AdminDateFilter";

// new components for combined payments
import TotalPayments from "../../components/admin/payments/TotalPayments";
import AveragePayment from "../../components/admin/payments/AveragePayment";
import TotalPaymentRevenue from "../../components/admin/payments/TotalPaymentRevenue";

// Services
import { getAllDonations } from "../../services/donationService";
import { getAllAdoptions } from "../../services/adoptionService";

// Utils
import filterPaymentsByDate from "../../utils/filterPaymentsByDate";
import filterPaymentsByType from "../../utils/filterPaymentsByType";

function DonationsOverview() {
    const [dateRange, setDateRange] = useState("30");
    const [donations, setDonations] = useState([]);
    const [adoptions, setAdoptions] = useState([]);
    const [paymentType, setPaymentType] = useState("All");
    // Add new state for wishlist purchases here
    const [loading, setLoading] = useState(true);

    // Fetch donations and adoptions
    useEffect(() => {
        async function fetchPayments() {
            try {
                const results = await Promise.allSettled([
                    getAllDonations(),
                    getAllAdoptions()
                ]);

                if (results[0].status === "fulfilled") {
                    setDonations(results[0].value.data);
                } else {
                    console.error("Error fetching donations:", results[0].reason);
                }

                if (results[1].status === "fulfilled") {
                    setAdoptions(results[1].value.data);
                } else {
                    console.error("Error fetching adoptions:", results[1].reason);
                }
             
            } catch (error) {
                console.error("Error fetching payments:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPayments();
    }, []);

    // Filter donations and adoptions using the shared date filter 
    const filteredDonations = filterPaymentsByDate(donations, dateRange);
    const filteredAdoptions = filterPaymentsByDate(adoptions, dateRange);

    // convert adoptions and donations in a shared payment structure
    const allPayments = [
        ...filteredDonations.map((donation) => ({
            id: `donation-${donation.donation_id}`,
            customer_id: donation.customer_id,
            date: donation.donation_date,
            type: "Donation / Wishlist",
            payment_method: donation.payment_method,
            amount: donation.amount,
            currency: donation.currency,
            transaction_reference: donation.transaction_reference,
        })),
        ...filteredAdoptions.map((adoption) => ({
            id: `adoption-${adoption.adoption_id}`,
            customer_id: adoption.customer_id,
            date: adoption.adoption_date,
            type: "Adoption",
            payment_method: adoption.payment_method,
            amount: adoption.amount,
            currency: adoption.currency,
            transaction_reference: adoption.transaction_reference
        }))
    ];

    // filter payments by selected payment type
    const filteredPayments = filterPaymentsByType(allPayments, paymentType);

    // Sort all payments by newest first
    const sortedPayments = [...filteredPayments].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
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
            
            {/* Overall payment statistics */}
            <div className="adminStatisticWrapper">
                <TotalPayments payments={allPayments} />
                <AveragePayment payments={allPayments} />
                <TotalPaymentRevenue payments={allPayments} />
            </div>

            {/* Donations analytics */}
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

            {/* Donations table */}
            <div className="adminDonationsSection">
                <div className="adminDonationsHeading">
                    <div>
                        <h3 className="adminSectionTitle">Payment History</h3>
                        <p>All payments made by users</p>
                    </div>

                    <div className="adminPaymentHistoryControls">
                        <select
                            className="adminPaymentTypeFilter"
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                        >
                            <option value="All">All Payments</option>
                            <option value="Donation / Wishlist">Donations / Wishlists</option>
                            <option value="Adoption">Adoptions</option>
                        </select>
                        <span className="adminDonationCount">
                        {filteredPayments.length} Payments
                        </span>
                    </div>
                </div>
                
                <div className="adminDonationsTableWrapper">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <table className="adminDonationsTable">
                            <thead>
                                <tr>
                                    <th>Payment ID</th>
                                    <th>Customer ID</th>
                                    <th>Date</th>
                                    <th>Payment Type</th>
                                    <th>Payment Method</th>
                                    <th>Amount</th>
                                    <th>Currency</th>
                                    <th>Transaction Reference</th>
                                </tr>
                            </thead>

                        <tbody>
                            {sortedPayments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{payment.customer_id}</td>
                                    <td>{payment.date ? new Date(payment.date).toLocaleDateString("en-AU") : ""}</td>
                                    <td>{payment.type}</td>
                                    <td>{payment.payment_method}</td>
                                    <td>{Number(payment.amount).toFixed(2)}</td>
                                    <td>{payment.currency}</td>
                                    <td>{payment.transaction_reference}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}

                    {!loading && filteredPayments.length === 0 && (
                        <p>No payments found for this date range.</p>
                    )}
                </div>
            </div>

    </div>
  )
}

export default DonationsOverview; 