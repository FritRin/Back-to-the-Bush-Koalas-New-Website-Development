import { useState } from "react";
import { createKoala } from "../../api/Koala";


function KoalaCreate({ onClose, onSuccess }) {
    const [koalaName, setKoalaName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Available");
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!koalaName.trim()) {
            validationErrors.koalaName = "Koala name is required";
        }

        if (!description.trim()) {
            validationErrors.description = "Description is required";
        }

        if (images.length === 0) {
            validationErrors.images = "At least one image is required";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("admin_id", 1);
            formData.append("koala_name", koalaName);
            formData.append("description", description);
            formData.append("status", status);

            images.forEach((image) => {
                formData.append("images", image);
            });

            await createKoala(formData);

            setSuccessMessage(
                "✅ Koala created successfully!"
            );

            setTimeout(() => {
                onSuccess?.();
                onClose();
            }, 1500);

        } catch (error) {
            console.error(error);

            setErrors({
                submit:
                    "Unable to create koala. Please try again.",
            });
        } finally {
            setLoading(false);
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
                        {errors.koalaName && (
                            <p className="mb-1 text-sm text-red-500">
                                {errors.koalaName}
                            </p>
                        )}

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
                        {errors.description && (
                            <p className="mb-1 text-sm text-red-500">
                                {errors.description}
                            </p>
                        )}

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

                    {/* Upload Images */}
                    <div className="max-w-xl">
                        <label className="
                            flex flex-col 
                            items-center 
                            justify-center 
                            w-full 
                            h-32 
                            border-2 
                            border-dashed 
                            border-gray-300 
                            rounded-lg 
                            cursor-pointer 
                            bg-gray-50 
                            hover:bg-gray-100 
                            transition-colors
                        ">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <p className="mb-2 text-sm text-gray-500 font-semibold">Click to upload </p>
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

                    {errors.images && (
                        <p className="mb-2 text-sm text-red-500">
                            {errors.images}
                        </p>
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

                {successMessage && (
                    <div className="mb-4 rounded-lg border border-green-200 bg-green-100 p-3 text-green-700">
                        {successMessage}
                    </div>
                )}

                {errors.submit && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-100 p-3 text-red-700">
                        {errors.submit}
                    </div>
                )}
            </div>

        </div>
    );
}

export default KoalaCreate;