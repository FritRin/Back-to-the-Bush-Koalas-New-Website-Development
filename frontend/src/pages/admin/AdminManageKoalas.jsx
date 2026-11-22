import { useState } from "react";
import KoalaList from "../../components/admin/KoalaList"
import KoalaCreate from "../../components/admin/KoalaCreate"

function AdminManageKoalas() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  return (
    <div className="adminDashboard">
      

        <div className="adminDashboardTop">
          <h1 className="adminManageHeading">
            Manage Koalas
          </h1>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#9FA659] hover:bg-[#797641] text-white font-semibold px-5 py-3 rounded"
          >
            Create New Koala
          </button>
        </div>

        {showCreateModal && (
          <KoalaCreate
            onClose={() =>
              setShowCreateModal(false)
            }
            onSuccess={() => {
              window.location.reload();
            }}
          />
        )}
        <KoalaList />
      </div>
    
  )
}

export default AdminManageKoalas