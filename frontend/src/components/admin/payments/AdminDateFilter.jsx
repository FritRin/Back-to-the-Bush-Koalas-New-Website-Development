function AdminDateFilter({ dateRange, setDateRange }) {
    return (
        <div className="adminFilter">
            <label className="adminFilterLabel" htmlFor="dateRange">
                Date Range:
            </label>

            <select 
                id="dateRange"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
            >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="year">This year</option>
                <option value="all">All time</option>
            </select>
        </div>
    );
}

export default AdminDateFilter;