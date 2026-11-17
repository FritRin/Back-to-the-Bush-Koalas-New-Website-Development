import StatisticCard from "../payments/StatisticDisplay";

function TotalDonations({ donations }) {
    const totalDonations = donations.length;

    return (
        <StatisticCard 
            title="Total Donations"
            value={totalDonations}
        />
    );
}

export default TotalDonations;