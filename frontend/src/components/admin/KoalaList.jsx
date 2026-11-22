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
      <div className="w-full overflow-x-auto border border-[#DDE3C3] rounded-lg bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#DDE3C3] text-[#4B4C2C]">
            <tr>
              <th scope="col" className="px-6 py-4 text-sm ">
                ID
              </th>
              <th scope="col" className="px-6 py-4 text-sm ">
                Image
              </th>
              <th scope="col" className="px-6 py-4 text-sm ">
                Name
              </th>
              <th scope="col" className="px-6 py-4 text-sm ">
                Status
              </th>
              <th scope="col" className="px-6 py-4 text-sm ">
                Description
              </th>
              <th scope="col" className="px-6 py-4 text-sm ">
                Date added
              </th>
              <th scope="col" className="px-6 py-4 text-sm ">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-[#4B4C2C]">
            {koalas.map((koala) => (
              <tr
                key={koala.koala_id}
                className="border-b border-[#DDE3C3] even:bg-[#F2F5E8] transition-colors"
              >
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {koala.koala_id}
                </th>
                <td className="px-6 py-4">
                    {koala.image_url ? (
                      <img
                        src={koala.image_url}
                        alt={koala.koala_name}
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                    ) : (
                      <p>No Image</p>
                    )}
                </td>
                <td className="px-6 py-4 font-semibold">
                  {koala.koala_name}
                </td>
                <td className="px-6 py-4">
                  {koala.status}
                </td>
                <td className="px-6 py-4 min-w-64">
                  {koala.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(koala.date_added).toLocaleDateString("en-GB")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4 font-semibold">
                    <button
                      onClick={() => {
                        setSelectedKoala(koala);
                        setShowEditModal(true);
                      }}
                      className="text-[#797641] hover:text-[#4B4C2C] hover:underline"
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
                </div>
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