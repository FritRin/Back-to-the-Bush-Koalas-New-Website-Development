import { Outlet } from "react-router-dom";
import NavAdmin from "../components/NavAdmin";

function AdminPanelLayout() {
  return (
    <div className="adminPanelLayout">
  
      <div className="adminPanelHeader">
        <h1> Admin Dashboard</h1>
      </div>
      
      <div className="adminPanelContent">
        <NavAdmin />
        <div className="adminPanelMain">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPanelLayout;