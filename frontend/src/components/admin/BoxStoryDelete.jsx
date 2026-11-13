import { useState } from "react";
import { deleteBox } from "../../api/Box";

function BoxStoryDelete({ box, onSuccess }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteBox(box.box_id);
            if (onSuccess) {
                onSuccess();
            }
            setIsOpen(false);
        } catch (error) {
            console.error("Error deleting sub story:", error);
            alert(error.response?.data?.message || "Failed to delete sub story");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="px-3 py-1.5 text-sm font-medium bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors"
            >
                Remove
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">
                            Delete Sub Story
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-gray-900">
                                "{box.story?.title || "this post"}"
                            </span>
                            ? This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                disabled={loading}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={loading}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
                            >
                                {loading ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BoxStoryDelete;