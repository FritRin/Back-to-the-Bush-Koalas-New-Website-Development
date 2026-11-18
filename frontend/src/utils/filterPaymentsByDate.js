function filterPaymentsByDate(payments, dateRange) {
    const today = new Date();

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    if (dateRange === "all") {
        return payments;
    }

    let startDate;

    if (dateRange === "year") {
        startDate = new Date(today.getFullYear(), 0, 1);
    } else {
        startDate = new Date(today);
        startDate.setDate(today.getDate() - (Number(dateRange) - 1));
    }

    const startDateString = formatDate(startDate);
    const todayString = formatDate(today);

    return payments.filter((payment) => {
        const paymentDate =
            payment.donation_date ||
            payment.adoption_date ||
            payment.purchase_date;

        if (!paymentDate) {
            return false;
        }
        
        const dateString = String(paymentDate).substring(0, 10);

        return dateString >= startDateString && dateString <= todayString;
    });
}

export default filterPaymentsByDate;