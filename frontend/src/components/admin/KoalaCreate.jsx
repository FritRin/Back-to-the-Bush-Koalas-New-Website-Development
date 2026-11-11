import { useState } from "react";
import { createKoala } from "../../api/Koala";


function KoalaCreate({ onClose }) {
    const [koalaName, setKoalaName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Available");
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("admin_id", 1); // remove this when TOKENS AND JWK is implemented to allow login as a admin.
            formData.append("koala_name", koalaName);
            formData.append("description", description);
            formData.append("status", status);

            images.forEach((image) => {
                formData.append("images", image);
            });

            await createKoala(formData);

            alert("Koala created successfully!");

            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to create koala.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">

                <h2 className="text-2xl font-bold mb-4">
                    Create New Koala
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block mb-1">
                            Koala Name
                        </label>

                        <input
                            type="text"
                            value={koalaName}
                            onChange={(e) => setKoalaName(e.target.value)}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">
                            Status
                        </label>

                        <input
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border rounded p-2"
                            placeholder="Enter status..."
                        />
                    </div>

                    <div className="max-w-xl">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <p className="mb-2 text-sm text-gray-500 font-semibold">Click to upload <span className="font-normal">or drag & drop</span></p>
                                <p className="text-xs text-gray-400">PNG or JPG</p>
                            </div>

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full border-2"
                            />
                        </label>
                    </div>

                    {images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    className="h-24 w-full object-cover rounded"
                                />
                            ))}
                        </div>
                    )}

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded"
                        >
                            Create Koala
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default KoalaCreate;