import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from "react-router-dom";
function Logo() {
    return (
        <Link to="/">
            <div className="grid grid-cols-[auto_auto] " >
                <img src={logo} alt="logo" className="size-30" />
                <div className="grid grid-rows-[auto_auto] items-center">
                    <span className='text-white text-xl font-semibold w-30 h-15 text-center'>Back To The Bush Koalas, Ltd</span>
                    <span className='text-white text-center'>Toowoomba, QLD</span>
                </div>
            </div>
        </Link>
    )
}

export default Logo;