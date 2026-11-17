import StatisticCard from "../payments/StatisticDisplay";

function AverageDonation({ donations }) {
    const totalAmount = donations.reduce((total, donation) => total + Number(donation.amount), 0);

    const averageDonation = donations.length > 0 ? totalAmount / donations.length : 0;

    return (
        <StatisticCard 
            title="Average Donation"
            value={`$${averageDonation.toFixed(2)}`}
        />
    );
}

export default AverageDonation;