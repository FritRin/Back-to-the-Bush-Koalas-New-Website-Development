import { useState } from "react";
import { updateKoala } from "../../api/Koala";

function KoalaUpdate({ koala, onClose, onSuccess }) {
    const [koalaName, setKoalaName] = useState(koala.koala_name || "");
    const [description, setDescription] = useState(koala.description || "");
    const [status, setStatus] = useState(koala.status || "Available");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

     

        try {
            // 1. Build FormData object
            const formData = new FormData();
            formData.append("koala_name", koalaName);
            formData.append("description", description);
            formData.append("status", status);

            // 2. Append file only if selected
            if (image) {
                formData.append("images", image); // Field key 'images' must match backend: upload.array("images")
            }

            // 3. Send request (updateKoala passes formData directly to Axios)
            await updateKoala(koala.koala_id, formData);

            alert("Koala updated successfully");

            if (onSuccess) {
                onSuccess();
            }

            onClose();
        } catch (error) {
            console.error("Update error:", error);
            alert(error.response?.data?.message || "Failed to update koala");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-y-auto">
            <div className="bg-white p-6 rounded-lg w-full max-w-xl">
                <h2 className="text-2xl font-bold mb-4">Update Koala</h2>

                <form onSubmit={handleSubmit}>
                    {/* Koala Name */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Koala Name</label>
                        <input
                            type="text"
                            value={koalaName}
                            onChange={(e) => setKoalaName(e.target.value)}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded p-2 w-full"
                        >
                            <option value="Available">Available</option>
                            <option value="Pending">Pending</option>
                            <option value="Adopted">Adopted</option>
                            <option value="Recovering">Recovering</option>
                        </select>
                    </div>

                    {/* Current Image */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Current Image</label>
                        {koala.image_url ? (
                            <img
                                src={`http://localhost:3000${koala.image_url}`}
                                alt={koala.koala_name}
                                className="w-full h-48 object-cover rounded mb-2 border"
                            />
                        ) : (
                            <p className="text-gray-500 italic">No image uploaded</p>
                        )}
                    </div>

                    {/* Replace Image */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Replace Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0] || null)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* New Image Preview */}
                    {image && (
                        <div className="mb-4">
                            <p className="mb-2 font-medium text-sm text-gray-700">New Image Preview</p>
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded border"
                                onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                            />
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default KoalaUpdate;