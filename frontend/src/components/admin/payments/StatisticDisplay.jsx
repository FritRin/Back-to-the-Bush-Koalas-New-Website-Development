function StatisticCard({ title, value, icon }) {
    return (
        <div className="adminStatisticCard">
            <div className="adminStatisticIcon">
                {icon}
            </div>
            <div className="adminStatisticValue">
                {value}
            </div>
            <div className="adminStatisticTitle">
                {title}
            </div>
        </div>
    );
}

export default StatisticCard;