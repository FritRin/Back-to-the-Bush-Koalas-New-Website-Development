import React from 'react'

import Logo from './Logo';
import Nav from './Nav';
import EmergencyButton from './EmergencyButton';
function Header() {
    return (
        <header className="relative z-50 flex items-center justify-between bg-[#9FA659] shadow">
            <Logo/>            
            <Nav/>
            <EmergencyButton/>
        </header>
    );
}

export default Header; 