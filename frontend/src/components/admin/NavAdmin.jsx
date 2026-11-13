import { NavLink } from "react-router-dom";

function NavAdmin() {
    return (
            <aside className="adminSidebar">
                <nav>
                    <ul className="adminSidebarLinks">
                        <li>
                            <NavLink to="/admin" end className="adminSidebarLink">
                                Donations Overview
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/admin/website-traffic" end className="adminSidebarLink">
                                Website Traffic Overview
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
                    </ul>
                </nav>
            </aside>
  
    );
}
export default NavAdmin