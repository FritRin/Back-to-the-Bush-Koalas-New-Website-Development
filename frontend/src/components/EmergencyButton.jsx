import React from 'react'
import { Link } from "react-router-dom";
import { PiPhoneCallFill } from "react-icons/pi";



function EmergencyButton() {
    return (
        <div>
            <Link to="/emergency">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
                    <PiPhoneCallFill />
                    <span>Koala Rescue 24/7</span>
                </button>
            </Link>


        </div>
    )
}

export default EmergencyButton;