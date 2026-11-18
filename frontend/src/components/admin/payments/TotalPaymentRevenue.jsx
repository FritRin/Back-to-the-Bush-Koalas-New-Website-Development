import { TrendingUp } from "lucide-react";
import StatisticCard from "./StatisticDisplay";

function TotalRevenue({ payments }) {
    const totalRevenue = payments.reduce((total, payment) => total + Number(payment.amount || 0), 0);

    return (
        <StatisticCard 
            title="Total Revenue"
            value={`$${totalRevenue.toFixed(2)}`}
            icon={<TrendingUp />}
        />
    );
}

export default TotalRevenue;