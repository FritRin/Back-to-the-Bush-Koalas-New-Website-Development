function PaymentTypeFilter({ paymentType, setPaymentType }) {
    return (
        <div className="adminFilter">
            <label className="adminFilterLabel" htmlFor="paymentType">
                Payment Type:
            </label>

            <select 
                id="paymentTypeFilter"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
            >
                <option value="All">All Payments</option>
                <option value="Donation / Wishlist">Donations / Wishlists</option>
                <option value="Adoption">Adoptions</option>
            </select>
        </div>
    );
}

export default PaymentTypeFilter;