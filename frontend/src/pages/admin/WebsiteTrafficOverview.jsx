function WebsiteTrafficOverview() {
    return (
        <div className="adminDashboard">
            <div className="adminDashboardTop">
                <div className="adminDashboardOverview">
                    <h2>Website Traffic Overview</h2>
                    <p>Monitor website traffic and visitor activity</p>
                </div>
            </div>
            
            <div className="adminTrafficChartsSection">
                <div className="adminTrafficMainGrid">
                    <div className="adminTrafficAnalytics">
                        <h3>Website Traffic Over Time</h3>
                        <div className="adminTrafficChart">
                            {/* Traffic chart here */}
                        </div>
                    </div>

                    <div className="adminTrafficAnalytics">
                        <h3>User Engagement</h3>
                        <div className="adminTrafficChart">
                            {/* Engagement chart here */}
                            </div>
                    </div>
                </div>
        
                <div className="adminTrafficSecondaryGrid">
                    <div className="adminTrafficAnalytics">
                        <h3>Traffic Sources</h3>

                        <div className="adminTrafficChart">
                            {/* Traffic sources chart here */}
                        </div>
                    </div>

                    <div className="adminTrafficAnalytics">
                        <h3>Visitor Devices</h3>

                        <div className="adminTrafficChart">
                            {/* Visitor devices chart here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default WebsiteTrafficOverview;
    

            