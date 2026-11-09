import { NavLink } from "react-router-dom";

function NavAdmin() {
    return (
            <aside className="adminSidebar">
                <nav>
                    <ul className="adminSidebarLinks">
                        <li>
                            <NavLink to="/admin" end className="adminSidebarLink">
                                Dashboard
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/admin/manage-koalas" className="adminSidebarLink">
                                Manage Koalas
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/admin/stories" className="adminSidebarLink">
                                Manage Stories
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/admin/donations" className="adminSidebarLink">
                                Donations
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/login" className="adminSidebarLogout">
                                Logout
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </aside>
  
    );
}
export default NavAdmin