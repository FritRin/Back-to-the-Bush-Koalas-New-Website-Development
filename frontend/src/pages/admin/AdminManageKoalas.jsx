import { useState } from "react";
import KoalaList from "../../components/admin/KoalaList"
import KoalaCreate from "../../components/admin/KoalaCreate"

function AdminManageKoalas() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  return (
    <div className="min-h-screen bg-[#EEF2DB] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4B4C2C] m-0">
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
    </div>
  )
}

export default AdminManageKoalas