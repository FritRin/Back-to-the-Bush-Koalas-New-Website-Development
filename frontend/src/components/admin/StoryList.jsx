import { useEffect, useState } from "react";
import { getAllStories } from "../../api/Story";

function StoryList({refreshKey, onCreateStory, onEditStory, onDeleteStory,}) {

    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStories();
    }, [refreshKey]);

    const loadStories = async () => {
        try {
            const data = await getAllStories();
            setStories(data);
        } catch (error) {
            console.error("Failed to load stories:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading stories...</p>;
    }

    return (
        <section className="story-library">
            {/* Header only contains the title now */}
            <div className="mb-5">
                <h2 className="text-xl font-semibold text-[#4B4C2C]">Story Library</h2>
            </div>

            {/* Grid container holding both the stories AND the Create button */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
                {stories.map((story) => (
                    <div
                        key={story.story_id}
                        className="overflow-hidden rounded-xl border border-[#DDE3C3] bg-white shadow-sm"
                    >
                        <div className="h-[220px] overflow-hidden">
                            <img
                                src={
                                    story.image_urls?.[0]
                                        ? story.image_urls[0]
                                        : "/placeholder-image.png"
                                }
                                alt={story.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="p-4">
                            <h3 className="mb-2 text-lg font-bold text-[#4B4C2C]">
                                {story.title}
                            </h3>

                            <p className="text-sm text-[#797641]">
                                Images: {story.image_urls?.length || 0}
                            </p>

                            <div className="mt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => onEditStory(story)}
                                    className="rounded-md bg-[#9FA659] px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#797641]"
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onDeleteStory(story)}
                                    className="px-3 py-1.5 text-sm font-medium bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors"

                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Create Story card sits at the end of the grid and shifts down as stories are added */}
                <button
                    type="button"
                    onClick={onCreateStory}
                    className="w-full h-full min-h-[320px] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors p-4 bg-white"
                >
                    <div className="text-center">
                        <span className="block text-lg font-bold text-gray-700">
                            + Create Story
                        </span>
                        <span className="block text-sm text-gray-500 mt-1">
                            Click to write a new story
                        </span>
                    </div>
                </button>
            </div>
        </section>
    );
}

export default StoryList;