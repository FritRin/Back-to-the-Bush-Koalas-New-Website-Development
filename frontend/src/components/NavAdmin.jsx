import { Link } from "react-router-dom";
function NavAdmin() {
    return (
        <div>
            <aside className="w-64 bg-white shadow-md min-h-screen">
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/?"
                                className="block px-4 py-3 rounded-lg hover:bg-[#9FA659] hover:text-white transition"
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/?"
                                className="block px-4 py-3 rounded-lg hover:bg-[#9FA659] hover:text-white transition"
                            >
                                ???
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/???"
                                className="block px-4 py-3 rounded-lg hover:bg-[#9FA659] hover:text-white transition"
                            >
                                ???
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/???"
                                className="block px-4 py-3 rounded-lg hover:bg-[#9FA659] hover:text-white transition"
                            >
                                ???
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/???"
                                className="block px-4 py-3 rounded-lg hover:bg-[#9FA659] hover:text-white transition"
                            >
                                ???
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/login"
                                className="block px-4 py-3 rounded-lg text-red-600 hover:bg-red-500 hover:text-white transition"
                            >
                                Logout
                            </Link>
                        </li>

                    </ul>
                </nav>
            </aside>
        </div>
    );
}
export default NavAdmin