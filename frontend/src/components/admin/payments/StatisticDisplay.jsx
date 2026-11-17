function StatisticCard({ title, value }) {
    return (
        <div className="adminStatisticDiv">
            <h3>{title}</h3>
            <h2>{value}</h2>
        </div>
    );
}

export default StatisticCard;