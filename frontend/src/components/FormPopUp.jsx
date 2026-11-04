import { useState } from "react";


const FormPopUp = ({ open, close }) => {
    const [donateWithCompany, setCompanyDonation] = useState("no");
    const [donationMethod, setDonationMethod] = useState("");
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
                <form class="flex flex-col items-center text-sm">
                    <button
                        onClick={close}
                        className="absolute top-2 right-2 text-red-700 text-3xl"
                    >
                        ✕
                    </button>
                    <h1 className="text-4xl font-semibold text-slate-700 pb-4">Add Your Information</h1>

                    {/* FirstName & Lastname */}
                    <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
                        <div className="w-full">
                            <label className="text-black/70" for="name">Your First Name</label>
                            <input className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="text" required />
                        </div>
                        <div className="w-full">
                            <label className="text-black/70" for="name">Your Last Name</label>
                            <input className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="text" required />
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
                                <label className="block mb-2">
                                    Please write company name.
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Company"
                                    className="w-full border rounded-md p-2"
                                />
                            </div>
                        )}
                    </div>

                    {/* Emaul & Phone */}
                    <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
                        <div className="w-full">
                            <label className="text-black/70" for="name">Email address</label>
                            <input className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="text" required />
                        </div>
                        <div className="w-full">
                            <label className="text-black/70" for="name">Phone number</label>
                            <input className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="text" required />
                        </div>
                    </div>

                    {/* Street Number & Name*/}
                    <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
                        <div className="w-full">
                            <label className="text-black/70" for="name">Street number</label>
                            <input className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="text" required />
                        </div>
                        <div className="w-full">
                            <label className="text-black/70" for="name">Street name</label>
                            <input className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="text" required />
                        </div>
                    </div>

                    {/* Suburb & State */}
                    <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
                        <div className="w-full">
                            <label className="text-black/70" for="name">Suburb</label>
                            <input className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="text" required />
                        </div>
                        <div className="w-full">
                            <label className="text-black/70" for="name">State</label>
                            <input className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="text" required />
                        </div>
                    </div>

                    {/* Postcode & Country */}
                    <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
                        <div className="w-full">
                            <label className="text-black/70" for="name">Postcode</label>
                            <input className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="text" required />
                        </div>
                        <div className="w-full">
                            <label className="text-black/70" for="name">Country</label>
                            <input className="bg-[#D9D9D9] h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="text" required />
                        </div>
                    </div>

                    {/* Comments */}
                    <div className="mt-6 w-[350px] md:w-[700px]">
                        <label className="text-black/70" for="name">Comments</label>
                        <textarea className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-indigo-300" required></textarea>
                    </div>

                    {/* Buttons payment method */}
                    {/*TODO: Set the services link to paypal and giveNow  */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setDonationMethod("paypal")}
                            className={`flex-1 py-4 px-6 rounded-lg text-white font-semibold ${donationMethod === "paypal"
                                ? "bg-green-700"
                                : "bg-[#9FA659] hover:bg-[#8d9450]0"
                                }`}
                        >
                            PayPal
                        </button>

                        <button
                            type="button"
                            onClick={() => setDonationMethod("givenow")}
                            className={`flex-1 py-4 px-6 rounded-lg text-white font-semibold ${donationMethod === "givenow"
                                ? "bg-green-700"
                                : "bg-[#9FA659] hover:bg-[#8d9450]"
                                }`}
                        >
                            GiveNow
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
export default FormPopUp