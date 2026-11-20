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
                <h2 className="text-2xl font-bold">Story Library</h2>
            </div>

            {/* Grid container holding both the stories AND the Create button */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "20px",
                }}
            >
                {stories.map((story) => (
                    <div
                        key={story.story_id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            overflow: "hidden",
                            background: "#fff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        }}
                    >
                        <div
                            style={{
                                height: "220px",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={
                                    story.image_urls?.[0]
                                        ? story.image_urls[0]
                                        : "/placeholder-image.png"
                                }
                                alt={story.title}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </div>

                        <div style={{ padding: "16px" }}>
                            <h3>{story.title}</h3>

                            <p>
                                Images: {story.image_urls?.length || 0}
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "15px",
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={() => onEditStory(story)}
                                    className="px-3 py-1.5 text-sm font-medium bg-emerald-50 text-emerald-700 rounded-md hover:bg-emerald-100"
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