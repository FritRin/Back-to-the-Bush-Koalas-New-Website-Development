import { Outlet } from "react-router-dom";
import NavAdmin from "../components/NavAdmin";

function AdminPanelLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#9FA659] text-white p-4 shadow">
        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>
      </header>
      
      <div className="flex">
        {/* Main Content */}
        <NavAdmin />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminPanelLayout;