import React from 'react'
import { useMediaQuery } from 'react-responsive';
import Logo from './Logo';
import NavDekstop from './Nav';
import NavMobile from './NavMobile'
import EmergencyButton from './EmergencyButton';
function Header() {
    const isTabletOrMobile = useMediaQuery({maxWidth: 768});
    return (
        <header className="relative z-50 flex items-center justify-between bg-[#9FA659] shadow max-md:flex-col">
            <Logo/>            
            {isTabletOrMobile ? <NavMobile /> : <NavDekstop />}
            <EmergencyButton/>
        </header>
    );
}

export default Header; 