import { CreditCard } from "lucide-react";
import StatisticCard from "./StatisticDisplay";

function TotalPayments({ payments }) {
    const totalPayments = payments.length;

    return (
        <StatisticCard 
            title="Total Payments"
            value={totalPayments}
            icon={<CreditCard />}
        />
    );
}

export default TotalPayments;