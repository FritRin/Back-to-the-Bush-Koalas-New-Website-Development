import { useEffect, useState } from "react";
import { getAllKoalas } from "../../api/Koala";
import KoalaUpdate from './KoalaUpdate';
import KoalaDelete from './KoalaDelete';

function KoalaList() {
  const [koalas, setKoalas] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedKoala, setSelectedKoala] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const loadKoalas = async () => {
    try {
      const data = await getAllKoalas();
      setKoalas(data);
    } catch (error) {
      console.error("Error loading Adopt Koala list:", error);
    }
  };

  useEffect(() => {
    loadKoalas();
  }, []);

  return (
    <div>
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 shadow-md rounded-xl bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead className="bg-[#B7B094]">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                ID
              </th>
              <th scope="col" className="px-6 py-3 ">
                img
              </th>
              <th scope="col" className="px-6 py-3 ">
                name
              </th>
              <th scope="col" className="px-6 py-3 ">
                status
              </th>
              <th scope="col" className="px-6 py-3 ">
                description
              </th>
              <th scope="col" className="px-6 py-3 ">
                date added
              </th>
              <th scope="col" className="px-6 py-3 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {koalas.map((koala) => (
              <tr
                key={koala.koala_id}
                className="
                  border-b border-default
                  hover:bg-neutral-secondary-medium"
              >
                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                  {koala.koala_id}
                </th>
                <td className="px-6 py-4">
                  <div className="sm:w-full">
                    {koala.image_url ? (
                      <img
                        src={`http://localhost:3000${koala.image_url}`}
                        alt={koala.koala_name}
                        className="h-24 w-24 object-cover rounded"
                      />
                    ) : (
                      <p>No Image</p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {koala.koala_name}
                </td>
                <td className="px-6 py-4">
                  {koala.status}
                </td>
                <td className="px-6 py-4">
                  {koala.description}
                </td>
                <td className="px-6 py-4">
                  {new Date(koala.date_added).toLocaleDateString("en-GB")}
                </td>
                <td className="flex items-center px-6 py-4 font-bold gap-5">
                  <button
                    onClick={() => {
                      setSelectedKoala(koala);
                      setShowEditModal(true);
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setSelectedKoala(koala);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-700 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update form popup */}
      {showEditModal && selectedKoala && (
        <KoalaUpdate
          koala={selectedKoala}
          onClose={() => {
            setShowEditModal(false);
            setSelectedKoala(null);
          }}
          onSuccess={loadKoalas}
        />
      )}

      {/* Delete Confirmation popup */}
      {showDeleteModal && selectedKoala && (
        <KoalaDelete
          koala={selectedKoala}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedKoala(null);
          }}
          onSuccess={loadKoalas}
        />
      )}
    </div>
  )
}

export default KoalaList