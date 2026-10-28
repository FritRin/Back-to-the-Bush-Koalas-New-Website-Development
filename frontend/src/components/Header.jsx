import React from 'react'

import Logo from './Logo';
import Nav from './Nav';
import EmergencyButton from './EmergencyButton';
function Header() {
    return (
        <header className="flex items-center justify-between px-8 py-4 bg-[#9FA659]  shadow">
            <Logo/>
            <Nav/>
            <EmergencyButton/>
        </header>
    );
}

export default Header 