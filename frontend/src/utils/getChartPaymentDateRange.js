function getChartPaymentDateRange(dateRange, payments) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let startDate = new Date(today);

    if (dateRange === "year") {
        startDate = new Date(today.getFullYear(), 0, 1);
    } else if (dateRange === "all") {
        const dates = payments.map((payment) => {
            const paymentDate =
                payment.donation_date ||
                payment.adoption_date ||
                payment.purchase_date;

            return paymentDate ? new Date(paymentDate) : null;
        })
        .filter((date) => date && !isNaN(date.getTime()))
        .map((date) => {
            date.setHours(0, 0, 0, 0);
            return date;
        });

    if (dates.length === 0) return [];
            
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

export default getChartPaymentDateRange;