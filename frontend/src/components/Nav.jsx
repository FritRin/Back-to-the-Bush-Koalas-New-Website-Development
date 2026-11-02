import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav className="
            flex justify-between 
            gap-6 
            font-bold 
            text-white 
            text-lg
        ">
            <Link
                to="/"
                className="hover:text-[#4B4C2C] transition"
            >
                Home
            </Link>

            <Link
                to="/our-story"
                className="hover:text-[#4B4C2C] transition"
            >
                Our Story
            </Link>

            <Link
                to="/our-facilities"
                className="hover:text-[#4B4C2C] transition"
            >
                Our Facilities
            </Link>

            {/* Our Community Dropdown */}
            <div className="relative group">
                <Link
                    to="/our-achievements"
                    className="hover:text-[#4B4C2C] transition"
                >
                    Our Archivements
                </Link>
                {/* <div className="
                    absolute 
                    left-0 
                    top-full 
                    hidden 
                    group-hover:block 
                    bg-[#9FA659] 
                    shadow-lg 
                    rounded-md 
                    min-w-64 
                    border
                ">
                    <Link
                        className="block px-4 py-3 hover:bg-[#797641]"
                        to="/tree-planting-engagements"
                    >
                        Tree Planting Engagements
                    </Link>
                </div> */}
            </div>

            {/* Donate Dropdown */}
            <div className="relative group">
                <Link className="hover:text-[#4B4C2C] transition" to="/donate">
                    Donate
                </Link>

                <div className="
                    absolute 
                    left-0 
                    top-full 
                    hidden 
                    group-hover:block 
                    bg-[#9FA659] 
                    shadow-lg 
                    rounded-md 
                    min-w-56 
                    border
                ">
                    <Link
                        className="block px-4 py-3 hover:bg-[#797641]"
                        to="/adopt-a-koala"
                    >
                        Adopt a Koala
                    </Link>
                </div>
            </div>

            <Link
                to="/contact-us"
                className="hover:text-[#4B4C2C] transition"
            >
                Contact Us
            </Link>
        </nav>
    );
}

export default Nav;