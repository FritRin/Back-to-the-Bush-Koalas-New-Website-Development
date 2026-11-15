import { useState, useEffect } from "react";

const FormPopUp = ({ open, close }) => {
  const [donateWithCompany, setCompanyDonation] = useState("no");
  const [donationMethod, setDonationMethod] = useState("");
  const [formErrors, setFormErrors] = useState({});
  // const [donationAmount, setDonationAmount] = useState("");
  // const [showGiveNow, setShowGiveNow] = usestate(false);

  useEffect(() => {
  if (donationMethod === "givenow") {
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
}, [donationMethod]);

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

    if (!firstName || firstName.length > 100) {
      errors.firstName = "First name is required (maximum 100 characters).";
    }

    if (!lastName || lastName.length > 100) {
      errors.lastName = "Last name is required (maximum 100 characters).";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      errors.email = "Please enter a valid email address.";
    }

    if (!/^[+]?[\d\s()-]{8,20}$/.test(phone)) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (donateWithCompany === "yes" && (!company || company.length > 150)) {
      errors.company = "Company name is required (maximum 150 characters).";
    }

    if (!streetNumber || streetNumber.length > 20) {
      errors.streetNumber = "Please enter a valid street number.";
    }

    if (!streetName || streetName.length > 150) {
      errors.streetName = "Please enter a valid street name.";
    }

    if (!suburb || suburb.length > 100) {
      errors.suburb = "Please enter a valid suburb.";
    }

    if (!state || state.length > 100) {
      errors.state = "Please enter a valid state.";
    }

    if (!postcode || postcode.length > 10) {
      errors.postcode = "Please enter a valid postcode.";
    }

    if (!country || country.length > 100) {
      errors.country = "Please enter a valid country.";
    }

    if (comments.length > 1000) {
      errors.comments = "Comments must not exceed 1000 characters.";
    }

    if (!donationMethod) {
      errors.donationMethod = "Please select a payment method.";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    // Validation passed. Payment integration is handled separately.
    console.log("Donation form validated", {
      firstName,
      lastName,
      email,
      phone,
      company: donateWithCompany === "yes" ? company : "",
      streetNumber,
      streetName,
      suburb,
      state,
      postcode,
      country,
      comments,
      donationMethod,
    });
  };

  if (!open) return null;

  return (
    <div
      data-dialog-backdrop="modal-md"
      data-dialog-backdrop-close="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div
        data-dialog="modal-md"
        className="relative m-4 p-4 w-full max-w-3xl max-h-[80vh] overflow-y-auto bg-[#EEF2DB] shadow-sm"
      >
        <form
          class="flex flex-col items-center text-sm"
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
                Your First Name
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
                Email address
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
          {/*TODO: Set the services link to paypal and giveNow  */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setDonationMethod("paypal")}
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
              onClick={() => setDonationMethod("givenow")}
              className={`flex-1 py-4 px-6 rounded-lg text-white font-semibold ${
                donationMethod === "givenow"
                  ? "bg-green-700"
                  : "bg-[#9FA659] hover:bg-[#8d9450]"
              }`}
            >
              GiveNow
            </button>
          </div>
          {formErrors.donationMethod && (
            <p className="text-red-600">{formErrors.donationMethod}</p>
          )}

          {donationMethod === "givenow" && (
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

          <button
            type="submit"
            className="mt-6 py-3 px-8 rounded-lg bg-[#9FA659] hover:bg-[#8d9450] text-white font-semibold"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
export default FormPopUp;
