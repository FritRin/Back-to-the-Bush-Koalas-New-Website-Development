function getChartDateRange(dateRange, donations) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let startDate = new Date(today);

    if (dateRange === "year") {
        startDate = new Date(today.getFullYear(), 0, 1);
    } else if (dateRange === "all") {
        if (payments.length === 0) return [];

        const dates = payments.map((payment) => {
            const date = new Date(payment.date || payment.donation_date);
            date.setHours(0, 0, 0, 0);
            return date;
        });

        startDate = new Date(Math.min(...dates.map(date => date.getTime())));
    } else {
        startDate.setDate(today.getDate() - (Number(dateRange) - 1));
    }
    
    const dates = [];

    for (
        let date = new Date(startDate);
        date <= today;
        date.setDate(date.getDate() + 1)
    ) {
        dates.push(new Date(date));
    }
    return dates;
}

export default getChartDateRange;