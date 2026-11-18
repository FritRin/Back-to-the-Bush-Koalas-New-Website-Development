import { useState } from "react";
import KoalaList from "../../components/admin/KoalaList"
import KoalaCreate from "../../components/admin/KoalaCreate"

function AdminManageKoalas() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  return (
    <div>
      <div>
        <h1>Manage Koalas</h1>
      </div>
      <button
        onClick={() => setShowCreateModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Create New Koala
      </button>

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