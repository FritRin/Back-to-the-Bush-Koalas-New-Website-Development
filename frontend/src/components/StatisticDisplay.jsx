import React from 'react';

function StatisticCard({ title, value }) {
    return (
        <div className="statisticDiv">
            <h3>{title}</h3>
            <h2>{value}</h2>
        </div>
    );
}

export default StatisticCard;