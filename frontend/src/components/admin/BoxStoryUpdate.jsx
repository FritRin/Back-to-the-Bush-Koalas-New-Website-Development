import { useState } from "react";
import { updateBox } from "../../api/Box";

function BoxStoryUpdate({ box, stories, slot = "secondary", onSuccess }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleUpdate = async (story) => {
        try {
            await updateBox(box.box_id, {
                story_id: story.story_id,
                slot: box?.slot || slot, // Keeps the box's existing slot ("main" or "secondary")
            });
            setIsOpen(false);
            onSuccess(); // Refresh list in parent
        } catch (error) {
            console.error("Failed to update sub story:", error);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="px-3 py-1.5 text-sm font-medium bg-emerald-50 text-emerald-700 rounded-md hover:bg-emerald-100"
            >
                Replace
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 p-8">
                    <div className="bg-white rounded-xl p-6 h-full overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Replace Sub Story</h2>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
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
                                            onClick={() => handleUpdate(story)}
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

export default BoxStoryUpdate;