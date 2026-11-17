import StatisticCard from "../payments/StatisticDisplay";

function TotalRevenue({ donations }) {
    const totalRevenue = donations.reduce((total, donation) => total + Number(donation.amount), 0);

    return (
        <StatisticCard 
            title="Total Revenue"
            value={`$${totalRevenue.toFixed(2)}`}
        />
    );
}

export default TotalRevenue;