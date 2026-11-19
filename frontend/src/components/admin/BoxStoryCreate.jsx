import { useState } from "react";
import { createBox } from "../../api/Box";

function BoxStoryCreate({ stories, slot = "secondary", onSuccess }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleCreate = async (story) => {
        try {
            await createBox({
                admin_id: 1,
                story_id: story.story_id,
                slot, // Uses "main" when passed from ManageMainBox, or "secondary" by default
            });
            setIsOpen(false);
            onSuccess(); // Refresh list in parent
        } catch (error) {
            console.error("Failed to create sub story:", error);
        }
    };

    return (
        <>
            {/* Empty / Add Card inside the 2-column grid */}
            <div
                onClick={() => setIsOpen(true)}
                className="border-2 border-dashed border-gray-300 rounded-xl min-h-[240px] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors p-4 bg-white"
            >
                <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-700">+ Add Story</h3>
                    <p className="text-sm text-gray-500">Click to choose a story</p>
                </div>
            </div>

            {/* Selector Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 p-8">
                    <div className="bg-white rounded-xl p-6 h-full overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Add Story</h2>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="bg-red-500 hover:bg-red-700 text-white font-extrabold py-6 px-8 rounded"
                            >
                                Close
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {stories.map((story) => (
                                <div
                                    key={story.story_id}
                                    className="border rounded-lg overflow-hidden flex flex-col justify-between"
                                >
                                    {story.image_urls?.[0] && (
                                        <img
                                            src={`http://localhost:3000${story.image_urls[0]}`}
                                            alt={story.title}
                                            className="w-full h-40 object-cover"
                                        />
                                    )}
                                    <div className="p-4 flex flex-col flex-1 justify-between">
                                        <h3 className="font-semibold mb-3">{story.title}</h3>
                                        <button
                                            type="button"
                                            onClick={() => handleCreate(story)}
                                            className="w-full py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700"
                                        >
                                            Select
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BoxStoryCreate;