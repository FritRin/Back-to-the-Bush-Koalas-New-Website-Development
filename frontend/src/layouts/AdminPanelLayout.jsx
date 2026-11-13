import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavAdmin from "../components/admin/NavAdmin";

function AdminPanelLayout() {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setLoggingOut(true);
    setError("");

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok && response.status !== 401) {
        throw new Error("Logout failed. Please try again.");
      }

      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to contact the server.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="adminPanelLayout">
      <div className="adminPanelHeader">
        <h1>Admin Dashboard</h1>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-lg"
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>

        {error && (
          <p className="text-red-600" role="alert">
            {error}
          </p>
        )}
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