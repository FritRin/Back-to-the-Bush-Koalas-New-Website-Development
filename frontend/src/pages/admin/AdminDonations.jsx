import { useState, useEffect } from "react";
 import { getAllDonations } from "../../services/donationService";

 function Donations() {
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

    // Sort donations newest first
    const sortedDonations = [...donations].sort(
        (a, b) => new Date(b.donation_date) - new Date(a.donation_date)
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="adminDonations">
            <div className="adminDashboardOverview">
                <h2>Donations</h2>
                <p>Donations made by users</p>
            </div>

            <div className="adminSectionContainer">
                <h3 className="adminSectionTitle">
                    All Donations ({donations.length})
                </h3>

                <div className="adminDonationsTableWrapper">
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

                    {donations.length === 0 && (
                        <p>No donations found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Donations;