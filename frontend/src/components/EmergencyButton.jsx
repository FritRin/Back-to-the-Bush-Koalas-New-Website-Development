import React from 'react'
import { Link } from "react-router-dom";
import { PiPhoneCallFill } from "react-icons/pi";
import '../index.css'



function EmergencyButton() {
    return (
        <div>
            <Link to="/emergency">
                <button className="emergencyButton">
                    <PiPhoneCallFill />
                    <span>Koala Rescue 24/7</span>
                </button>
            </Link>


        </div>
    )
}

export default EmergencyButton;