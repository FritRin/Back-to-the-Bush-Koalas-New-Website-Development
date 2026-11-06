import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import Wishlist from "../assets/medical-equipment.png"
import Adopt from "../assets/adopt-koala.png"
import DonateBtn from "../assets/donate.png"
import FormPopUp from "../components/FormPopUp";


function Donate() {
    const [showForm, setShowForm] = useState(false);
    return (
        <div className="pageContainer">
            {/* Whichlist link */}
            <div className="
                flex 
                justify-center 
                m-15 
                gap-10
                ">
                <Link to="/wishlist">
                    <div className="
                        relative 
                        w-80 
                        h-80 
                        transition-opacity 
                        duration-300 
                        hover:scale-110
                        shadow-lg
                    ">
                        <img
                            src={Wishlist}
                            alt="Donate for medical supply and equipments"
                            className="
                                w-full 
                                h-full 
                                object-cover 
                                rounded 
                        "/>
                        <div className="absolute inset-0 rounded "></div>
                        <div className="
                            bg-[#9FA659]/70 
                            hover:bg-[#9FA659]/30 
                            absolute 
                            inset-0 
                            flex 
                            items-center 
                            justify-center
                        ">
                            <h2 className="
                                text-white 
                                text-5xl 
                                font-extrabold 
                                text-center 
                                text-shadow-lg/100
                            ">
                                Wishlist
                            </h2>
                        </div>
                    </div>
                </Link>
                {/* Adopt a Koala Link */}
                <Link to="/adopt-a-koala">
                    <div className="
                        relative 
                        w-80 
                        h-80 
                        transition-opacity 
                        duration-300 
                        hover:scale-110
                        shadow-lg
                    ">
                        <img
                            src={Adopt}
                            alt="Adopt a Koala to help and recive a certificate"
                            className="
                            w-full 
                            h-full 
                            object-cover 
                            rounded 
                    "/>
                        <div className="absolute inset-0 rounded "></div>
                        <div className="
                            bg-[#9FA659]/70 
                            hover:bg-[#9FA659]/30
                            absolute 
                            inset-0 
                            flex 
                            items-center 
                            justify-center
                    ">
                            <h2 className="
                                text-white 
                                text-5xl 
                                font-extrabold 
                                text-center 
                                text-shadow-lg/100
                            ">
                                Adopt a Koala
                            </h2>
                        </div>
                    </div>
                </Link>
                {/* Donate Button Form */}
                <button onClick={() => setShowForm(true)} className="
                    relative 
                    w-80 
                    h-80 
                    transition-opacity 
                    duration-300 
                    hover:scale-110
                    shadow-lg
                ">
                    <img
                        src={DonateBtn}
                        alt="Donation via PayPal or GiveNow platforms"
                        className="
                            w-full 
                            h-full 
                            object-cover 
                            rounded 
                    "/>
                    <div className="absolute inset-0 rounded "></div>
                    <div className="
                        bg-[#9FA659]/70 
                        hover:bg-[#9FA659]/30 
                        absolute 
                        inset-0 
                        flex 
                        items-center 
                        justify-center
                    ">
                        <h2 className="
                            text-white 
                            text-5xl 
                            font-extrabold 
                            text-center 
                            text-shadow-lg/100
                        ">
                            Donate
                        </h2>
                    </div>
                </button>
            </div>
            <FormPopUp
                open={showForm}
                close={() => setShowForm(false)}
            />

            <h2 className="flex justify-center font-bold" >Your support will help fund</h2>
            <Outlet />
            <div className="flex justify-center">
                <ul class="list-disc">
                    <li>Hospital fit-out </li>
                    <li>Completing treatment areas and preparing the building for veterinary operations.</li>
                    <li>Essential medical equipment</li>
                    <li>Equipping the hospital to assess, diagnose and treat injured and sick koalas.</li>
                    <li>Veterinary and nursing care</li>
                    <li>Supporting the people needed to deliver safe, consistent care and respond to emergencies.</li>
                    <li>Ongoing operating costs funding medicines, medical consumables, food, utilities and the daily costs of caring for koalas.  </li>
                    <li>Opening the hospital is only the beginning. Sustainable funding will help ensure we can continue providing care, not just open our doors. </li>
                </ul>
            </div>
            <div className="
                bg-[#9FA659] 
                flex 
                justify-center 
                my-10
                mx-50
                p-5
                rounded
                shadow-lg
            ">
                <h3 className="
                    text-white 
                    text-2xl 
                    font-bold 
                    flex 
                    text-center
                ">
                    Your donation will be a powerful message of hope, compassion,
                    and a commitment to the future of koalas. Ways to Support Back
                    to the Bush Koalas, Ltd
                </h3>
            </div>
            <div className="my-10
                mx-50
                p-5">
                <p>
                    Every donation, no matter the size, brings us one step closer to
                    providing the koalas with the care they so desperately need.
                    Your generous contribution will go directly toward building the
                    hospital, purchasing medical equipment, and maintaining the
                    facility. Here are a few ways you can support our mission:
                </p>
            </div>
            <div>
                <div className="w-full max-w-3xl mx-auto my-8 border shadow-lg border-[#8A8750] bg-[#EEF2DB]">

                    {/* Header */}
                    <div className="bg-[#8A8750] py-4">
                        <h2 className="text-center text-white text-3xl font-bold">
                            Direct Deposit (in Australia)
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="px-8 py-6 text-center">
                        <p className="text-3xl mb-2">
                            Back to the Bush Koalas, Ltd
                        </p>

                        <p className="text-3xl mb-2">
                            <span className="font-bold">BSB</span> 638060
                        </p>

                        <p className="text-3xl mb-6">
                            <span className="font-bold">Account</span> 16591399
                        </p>

                        <p className="text-2xl mb-2">
                            Need a receipt? Email
                        </p>

                        <a
                            href="mailto:info@backtothebushkoalas.com.au"
                            className="text-[#9FA659] text-2xl underline mb-2">
                            info@backtothebushkoalas.com.au
                        </a>
                        <p className="text-2xl">
                            and please include your name.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Donate;