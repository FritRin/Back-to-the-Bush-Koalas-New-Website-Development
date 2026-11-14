import EngagementStatCard from "./EngagementStatCard";

function UserEngagement() {
    return (
        <div className="adminTrafficAnalytics">
            <h3>User Engagement</h3>

            <div className="adminEngagementStats">
                <EngagementStatCard
                    title="Avg Engagement Time"
                    value="--"
                />

                <EngagementStatCard
                    title="Engagement Rate"
                    value="--"
                />
            </div>
        </div>
    );
}

export default UserEngagement;