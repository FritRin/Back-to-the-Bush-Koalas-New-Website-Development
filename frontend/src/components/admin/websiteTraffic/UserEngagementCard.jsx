import EngagementStatCard from "./EngagementStatCard";

function UserEngagement({ engagementData = null }) {
    return (
        <div className="adminTrafficAnalytics">
            <h3>User Engagement</h3>

            <div className="adminEngagementStats">
                <EngagementStatCard
                    title="Avg Engagement Time"
                    value={
                        engagementData
                            ? `${Math.round(engagementData.averageEngagementTimeSeconds)} sec`
                            : "--"
                    }
                />

                <EngagementStatCard
                    title="Engagement Rate"
                    value={
                        engagementData
                            ? `${(engagementData.engagementRate * 100).toFixed(1)}%`
                            : "--"
                    }
                />
            </div>
        </div>
    );
}

export default UserEngagement;
