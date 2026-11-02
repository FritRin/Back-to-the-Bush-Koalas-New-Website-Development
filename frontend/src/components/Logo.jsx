import React from 'react'
import logo from '../assets/logo.svg'
function Logo() {
    return (
        <div className="grid grid-cols-[auto_auto] " >
            <img src={logo} alt="logo" className="size-30" />
            <div className="grid grid-rows-[auto_auto] flex items-center">
                <span className='text-white text-xl font-semibold text-2xl w-30 h-15 text-center'>Back To The Bush Koalas, Ltd</span>
                <span className='text-white text-center'>Toowoomba, QLD</span>
            </div>
        </div>
    )
}

export default Logo;