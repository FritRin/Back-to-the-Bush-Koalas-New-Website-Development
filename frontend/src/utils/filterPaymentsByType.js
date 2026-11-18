function filterPaymentsByType(payments, paymentType) {
    if (paymentType === "All") {
        return payments;
    }

    return payments.filter((payment) => payment.type === paymentType);
}

export default filterPaymentsByType;