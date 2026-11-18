import { useState, useEffect } from "react";
import PayPalAdoptWishlist from "./PayPalAdoptWishlist";
import { useNavigate } from "react-router-dom";

  const FormPopUp = ({ open, close, donationType = "general", selectedKoala, cartItems = [] }) => {
  const navigate = useNavigate();
  const [donateWithCompany, setCompanyDonation] = useState("no");
  const [donationMethod, setDonationMethod] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showGiveNow, setShowGiveNow] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  
  // Calculate the total cost of the items in cart to be used for PayPal.
  const cartTotal = cartItems.reduce(
    (total, item) => total + Number(item.donationAmount || 0),
    0
  );

  // Embedded form added once GiveNow is selected
  useEffect(() => {
  if (showGiveNow) {
    const timer = setTimeout(() => {
      if (window.iFrameResize) {
        window.iFrameResize(
          {
            checkOrigin: false,
            onScroll: function () {
              const element = document.getElementById("cause10867");

              if (element) {
                const offsetBonus = element.getAttribute("data-offset-bonus");

                if (offsetBonus !== null) {
                  const offset =
                    element.getBoundingClientRect().top + window.scrollY;

                  window.scrollTo({
                    top: offset - Number(offsetBonus),
                    behavior: "smooth"
                  });

                  return false;
                }
              }
            }
          },
          "#cause10867"
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }
}, [showGiveNow]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const clean = (value) => value.trim().replace(/[<>]/g, "");

    const firstName = clean(formData.get("firstName") || "");
    const lastName = clean(formData.get("lastName") || "");
    const email = (formData.get("email") || "").trim().toLowerCase();
    const phone = clean(formData.get("phone") || "");
    const company = clean(formData.get("company") || "");
    const streetNumber = clean(formData.get("streetNumber") || "");
    const streetName = clean(formData.get("streetName") || "");
    const suburb = clean(formData.get("suburb") || "");
    const state = clean(formData.get("state") || "");
    const postcode = clean(formData.get("postcode") || "");
    const country = clean(formData.get("country") || "");
    const comments = clean(formData.get("comments") || "");

    const errors = {};

    // Required fields
    if (!firstName || firstName.length > 100) {
      errors.firstName = "First name is required (maximum 100 characters).";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      errors.email = "Please enter a valid email address.";
    }

    // Optional fields - validate only if entered
    if (lastName && lastName.length > 100) {
      errors.lastName = "Last name must not exceed 100 characters.";
    }

    if (phone && !/^[+]?[\d\s()-]{8,20}$/.test(phone)) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (donateWithCompany === "yes" && company && company.length > 150) {
      errors.company = "Company name must not exceed 150 characters.";
    }

    if (streetNumber && streetNumber.length > 20) {
      errors.streetNumber = "Street number must not exceed 20 characters.";
    }

    if (streetName && streetName.length > 150) {
      errors.streetName = "Street name must not exceed 150 characters.";
    }

    if (suburb && suburb.length > 100) {
      errors.suburb = "Suburb must not exceed 100 characters.";
    }

    if (state && state.length > 100) {
      errors.state = "State must not exceed 100 characters.";
    }

    if (postcode && postcode.length > 10) {
      errors.postcode = "Postcode must not exceed 10 characters.";
    }

    if (country && country.length > 100) {
      errors.country = "Country must not exceed 100 characters.";
    }

    if (comments.length > 1000) {
      errors.comments = "Comments must not exceed 1000 characters.";
    }

    if (!donationMethod) {
      errors.donationMethod = "Please select a payment method.";
    }

    if (
      donationMethod === "paypal" &&
      donationType === "general" &&
      (!Number.isFinite(Number(donationAmount)) || Number(donationAmount) <= 0)
    ) {
      errors.amount = "Please enter a valid donation amount.";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (donationMethod === "givenow") {
      setShowGiveNow(true);
      return;
    }

    if (donationMethod === "paypal") {
      // If general donation, set to the user typed amount. If adoption, then 50 for the amount. Otherwise (wishlist) whatever is the total amount in cart.
      const amount = donationType === "general" ? Number(donationAmount) : donationType === "adoption" ? 50 : cartTotal;
      // Set the amount, customer information from the form to be passed later.
      setDonationAmount(String(amount));
      setCustomerDetails({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        street_number: streetNumber,
        street_name: streetName,
        suburb,
        state,
        postcode,
        country,
        company_name: donateWithCompany === "yes" ? company : null
      });
      setShowPayPal(true);
    }
  };
  // Ensure that the success message shows properly, hiding the PayPal section and show the success modal.
  const handlePaymentSuccess = () => {
      setShowPayPal(false);
      setShowPaymentSuccess(true);
  };

  if (!open) return null;

  return (
    <div
      data-dialog-backdrop="modal-md"
      data-dialog-backdrop-close="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      {/* When no payment is made yet via PayPal, render the form as normal. */}
      <div
        data-dialog="modal-md"
        className={`relative m-4 p-4 w-full max-w-3xl max-h-[80vh] overflow-y-auto shadow-sm ${ showPaymentSuccess ? "bg-transparent border-0 shadow-none" : "bg-[#EEF2DB]" }`}
        >
    {!showPaymentSuccess && (
      <>
        <form
          noValidate
          className="flex flex-col items-center text-sm"
          onSubmit={handleSubmit}
        >
          <button
            onClick={close}
            type="button"
            className="absolute top-2 right-2 text-red-700 text-3xl"
          >
            ✕
          </button>
          <h1 className="text-4xl font-semibold text-slate-700 pb-4">
            Add Your Information
          </h1>

          {/* FirstName & Lastname */}
          <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
            <div className="w-full">
              <label className="text-black/70" for="name">
                Your First Name *
              </label>
              <input
                name="firstName"
                className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
                type="text"
                maxLength={100}
                required
              />
              {formErrors.firstName && (
                <p className="text-red-600">{formErrors.firstName}</p>
              )}
            </div>
            <div className="w-full">
              <label className="text-black/70" for="name">
                Your Last Name
              </label>
              <input
                name="lastName"
                className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
                type="text"
                maxLength={100}
                required
              />
              {formErrors.lastName && (
                <p className="text-red-600">{formErrors.lastName}</p>
              )}
            </div>
          </div>

          {/* Donate By company Yes Or No Options */}
          <div className="space-y-4">
            <label className="block font-medium">
              Is this donation on behalf of a company?
            </label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="donation"
                  value="yes"
                  checked={donateWithCompany === "yes"}
                  onChange={(e) => setCompanyDonation(e.target.value)}
                />
                Yes
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="donation"
                  value="no"
                  checked={donateWithCompany === "no"}
                  onChange={(e) => setCompanyDonation(e.target.value)}
                />
                No
              </label>
            </div>

            {donateWithCompany === "yes" && (
              <div>
                <label className="block mb-2">Please write company name.</label>

                <input
                  name="company"
                  type="text"
                  placeholder="Enter Company"
                  maxLength={150}
                  className="w-full border rounded-md p-2"
                  required
                />
                {formErrors.company && (
                  <p className="text-red-600">{formErrors.company}</p>
                )}
              </div>
            )}
          </div>

          {/* Emaul & Phone */}
          <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
            <div className="w-full">
              <label className="text-black/70" for="name">
                Email address *
              </label>
              <input
                name="email"
                className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
                type="email"
                maxLength={255}
                required
              />
              {formErrors.email && (
                <p className="text-red-600">{formErrors.email}</p>
              )}
            </div>
            <div className="w-full">
              <label className="text-black/70" for="name">
                Phone number
              </label>
              <input
                name="phone"
                className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
                type="tel"
                maxLength={20}
                required
              />
              {formErrors.phone && (
                <p className="text-red-600">{formErrors.phone}</p>
              )}
            </div>
          </div>

          {/* Street Number & Name*/}
          <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
            <div className="w-full">
              <label className="text-black/70" for="name">
                Street number
              </label>
              <input
                name="streetNumber"
                className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
                type="text"
                maxLength={20}
                required
              />
              {formErrors.streetNumber && (
                <p className="text-red-600">{formErrors.streetNumber}</p>
              )}
            </div>
            <div className="w-full">
              <label className="text-black/70" for="name">
                Street name
              </label>
              <input
                name="streetName"
                className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
                type="text"
                maxLength={150}
                required
              />
              {formErrors.streetName && (
                <p className="text-red-600">{formErrors.streetName}</p>
              )}
            </div>
          </div>

          {/* Suburb & State */}
          <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
            <div className="w-full">
              <label className="text-black/70" for="name">
                Suburb
              </label>
              <input
                name="suburb"
                className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
                type="text"
                maxLength={100}
                required
              />
              {formErrors.suburb && (
                <p className="text-red-600">{formErrors.suburb}</p>
              )}
            </div>
            <div className="w-full">
              <label className="text-black/70" for="name">
                State
              </label>
              <input
                name="state"
                className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
                type="text"
                maxLength={100}
                required
              />
              {formErrors.state && (
                <p className="text-red-600">{formErrors.state}</p>
              )}
            </div>
          </div>

          {/* Postcode & Country */}
          <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
            <div className="w-full">
              <label className="text-black/70" for="name">
                Postcode
              </label>
              <input
                name="postcode"
                className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
                type="text"
                maxLength={10}
                required
              />
              {formErrors.postcode && (
                <p className="text-red-600">{formErrors.postcode}</p>
              )}
            </div>
            <div className="w-full">
              <label className="text-black/70" for="name">
                Country
              </label>
              <input
                name="country"
                className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
                type="text"
                maxLength={100}
                required
              />
              {formErrors.country && (
                <p className="text-red-600">{formErrors.country}</p>
              )}
            </div>
          </div>

          {/* Comments */}
          <div className="mt-6 w-[350px] md:w-[700px]">
            <label className="text-black/70" for="name">
              Comments
            </label>
            <textarea
              name="comments"
              className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-indigo-300"
              maxLength={1000}
            ></textarea>
            {formErrors.comments && (
              <p className="text-red-600">{formErrors.comments}</p>
            )}
          </div>

          {/* Buttons payment method */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                // Ensuring that selecting between the methods will automatically hide the other method's already loaded embed.
                setDonationMethod("paypal");
                setShowGiveNow(false);
                setShowPayPal(false);
              }}
              className={`flex-1 py-4 px-6 rounded-lg text-white font-semibold ${
                donationMethod === "paypal"
                  ? "bg-green-700"
                  : "bg-[#9FA659] hover:bg-[#8d9450]0"
              }`}
            >
              PayPal
            </button>

            <button
              type="button"
              onClick={() => {
                // Same as above
                setDonationMethod("givenow");
                setShowGiveNow(false);
                setShowPayPal(false);
              }}
              className={`flex-1 py-4 px-6 rounded-lg text-white font-semibold ${
                donationMethod === "givenow"
                  ? "bg-green-700"
                  : "bg-[#9FA659] hover:bg-[#8d9450]"
              }`}
            >
              GiveNow
            </button>
          </div>

          { /* Show a text box to fill in the desired donation amount for general donations if user chooses PayPal. User then clicks continue to proceed. */ }
          {donationMethod === "paypal" && donationType === "general" && (
            <div className="mt-5 w-[350px] md:w-[700px]">
              <label className="text-black/70 font-medium">
                Donation Amount (in AUD)
              </label>

              <div className="flex items-center mt-2">
                <span className="bg-[#D9D9D9] border border-gray-500/30 rounded-l px-4 py-3">
                  A$
                </span>

                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Enter donation amount in AUD"
                  className="bg-[#D9D9D9] h-12 p-2 w-full border border-gray-500/30 rounded-r outline-none focus:border-indigo-300"
                />
              </div>

          {formErrors.amount && (
                <p className="text-red-600">{formErrors.amount}</p>
              )}
            </div>
          )}

          {formErrors.donationMethod && (
            <p className="text-red-600">{formErrors.donationMethod}</p>
          )}

          <button
            type="submit"
            className="mt-6 py-3 px-8 rounded-lg bg-[#9FA659] hover:bg-[#8d9450] text-white font-semibold"
          >
            Continue
          </button>
        </form>

        {showGiveNow && (
            <div className="w-full mt-6">
              <iframe
                id="cause10867" 
                className="gn-iframe"
                title="GiveNow Donation Form"
                src="https://www.givenow.com.au/embed/Y2F1c2VpZD0xMDg2NyZkb21haW49YmFja3RvdGhlYnVzaGtvYWxhcy5jb20uYXUmdG9rZW49MTA4Njc6Nzg0MzU3YjJhMTA3NTk1MQ%3D%3D"
                style={{
                  width: "1px",
                  minWidth: "100%",
                  border: 0,
                  height: "882px"
                }}
                data-offset-bonus="0"
                />
            </div>
          )}

          {showPayPal && (
            <div className = "w-full mt-6">
              <PayPalAdoptWishlist
                // Pass all the required information to PayPalAdoptWishList.jsx.
                donationType = {donationType}
                amount = { donationType === "general" ? Number(donationAmount) : donationType === "adoption" ? 50 : cartTotal }
                koalaId = {selectedKoala?.koala_id}
                cartItems={cartItems}
                customerDetails = {customerDetails}
                onPaymentSuccess = {handlePaymentSuccess}
              />
            </div>
          )}
            </>
          )}

          {/* Once payment via PayPal is successful, hides the entire form and only show the success pop up. That is why the entire form is wrapped in !showPaymentSuccess. There's prolly a better way to do this but this is what I can come up with. */}
          {showPaymentSuccess && (
              <div className = "fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
                  <div className = "bg-[#EEF2DB] rounded-xl p-8 mx-4 max-w-md w-full text-center shadow-xl">
                      <h2 className = "text-2xl font-bold text-slate-700 mb-3">
                          Donation Successful!
                      </h2>
                      <p className = "text-gray-600 mb-6">
                          Thank you for your donation to Back to the Bush Koalas.
                      </p>
                      <button
                          onClick = {() => {
                              setShowPaymentSuccess(false);
                              setShowPayPal(false);
                              close();
                              navigate("/"); 
                          }}
                          className = "bg-[#9FA659] hover:bg-[#8d9450] text-white font-semibold px-8 py-3 rounded-lg"
                      >
                          Home
                      </button>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};
export default FormPopUp;