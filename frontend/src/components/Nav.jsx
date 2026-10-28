import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav className="flex items-center gap-6 font-medium text-white">
            <Link
                to="/"
                className="hover:text-[#4B4C2C] transition"
            >
                Home
            </Link>

            <Link
                to="/our-story-and-inspection"
                className="hover:text-[#4B4C2C] transition"
            >
                Our Story & Inspection
            </Link>

            <Link
                to="/our-facilities-and-location"
                className="hover:text-[#4B4C2C] transition"
            >
                Facilities & Location
            </Link>

            {/* Our Community Dropdown */}
            <div className="relative group">
                <Link className="hover:text-[#4B4C2C] transition" to="/our-community">
                    Our Community
                </Link>

                <div className="absolute left-0 top-full hidden group-hover:block bg-[#9FA659] shadow-lg rounded-md min-w-64 border">
                    <Link
                        className="block px-4 py-3 hover:bg-[#797641]"
                        to="/volunteer-quotes"
                    >
                        Volunteer Quotes
                    </Link>

                    <Link
                        className="block px-4 py-3 hover:bg-[#797641]"
                        to="/koala-success-stories"
                    >
                        Koala Success Stories
                    </Link>

                    <Link
                        className="block px-4 py-3 hover:bg-[#797641]"
                        to="/school-engagements"
                    >
                        School Engagements
                    </Link>

                    <Link
                        className="block px-4 py-3 hover:bg-[#797641]"
                        to="/tree-planting-engagements"
                    >
                        Tree Planting Engagements
                    </Link>
                </div>
            </div>

            {/* Donate Dropdown */}
            <div className="relative group">
                <Link className="hover:text-[#4B4C2C] transition" to="/donate">
                    Donate
                </Link>

                <div className="absolute left-0 top-full hidden group-hover:block bg-[#9FA659] shadow-lg rounded-md min-w-56 border">

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