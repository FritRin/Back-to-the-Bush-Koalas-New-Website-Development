import React from 'react'
import { Link } from "react-router-dom";


function EmergencyButton() {
    return (
        <div>
            <Link
                to="/emergency"
                className="hover:text-red-600 transition font-semibold"
            >
                Emergency
            </Link>
        </div>
    )
}

export default EmergencyButton;