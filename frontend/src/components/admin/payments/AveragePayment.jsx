import StatisticCard from "./StatisticDisplay";

function AveragePayment({ payments }) {
    const totalAmount = payments.reduce((total, payment) => total + Number(payment.amount || 0), 0);

    const averagepayment = payments.length > 0 ? totalAmount / payments.length : 0;

    return (
        <StatisticCard 
            title="Average payment"
            value={`$${averagepayment.toFixed(2)}`}
        />
    );
}

export default Averagepayment;