function filterDonationsByDate(donations, dateRange) {
    const today = new Date();

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    if (dateRange === "all") {
        return donations;
    }

    let startDate;

    if (dateRange === "year") {
        startDate = new Date(today.getFullYear(), 0, 1);
    } else {
        startDate = new Date(today);
        startDate.setDate(today.getDate() - (Number(dateRange) - 1));
    }

    return donations.filter((donation) => {
        const donationDate = donation.donation_date.substring(0, 10);
        return donationDate >= formatDate(startDate) && donationDate <= formatDate(today);
    });
}

export default filterDonationsByDate;