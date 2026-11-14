import { useEffect, useState } from "react";
import { getAllBox } from "../api/Box";
import { getAllStories } from "../api/Story";
import { Link } from "react-router-dom";


function HomeStories() {
    const [mainBox, setMainBox] = useState(null);
    const [secondaryBoxes, setSecondaryBoxes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHomeStories();
    }, []);

    const loadHomeStories = async () => {
        try {
            const boxes = await getAllBox();
            const storiesData = await getAllStories();

            const boxList = Array.isArray(boxes) ? boxes : boxes.data || [];
            const storyList = Array.isArray(storiesData) ? storiesData : storiesData.data || [];

            const attachStory = (box) => {
                const matchedStory = storyList.find(
                    (story) => story.story_id === box.story_id
                );
                return {
                    ...box,
                    story: box.story || matchedStory || null,
                };
            };

            const foundMain = boxList.find((box) => box.slot === "main");
            setMainBox(foundMain ? attachStory(foundMain) : null);

            // Sort newest first so newly added sub-stories appear in the top 2x2 grid
            const foundSecondary = boxList
                .filter((box) => box.slot !== "main")
                .sort((a, b) => b.box_id - a.box_id)
                .map(attachStory);

            setSecondaryBoxes(foundSecondary);
        } catch (error) {
            console.error("Failed to load home stories:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-center py-8">Loading stories...</p>;
    }

    // First 4 sub-stories go into the 2x2 grid next to the Featured Story
    const heroSecondary = secondaryBoxes.slice(0, 4);
    // Any sub-stories beyond the first 4 appear BELOW the hero section
    const bottomSecondary = secondaryBoxes.slice(4);

    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            {/* 1. HERO SECTION: Large Main Square on Left + 2x2 Grid of 4 Sub-Stories on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Side: Featured Story (takes 2 columns) */}
                {mainBox && (
                    <div
                        className={
                            heroSecondary.length > 0
                                ? "lg:col-span-2"
                                : "lg:col-span-4"
                        }
                    >
                        <StoryCard box={mainBox} isMain={true} />
                    </div>
                )}

                {/* Right Side: 2x2 Grid of Sub-Stories (takes 2 columns) */}
                {heroSecondary.length > 0 && (
                    <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                        {heroSecondary.map((box) => (
                            <StoryCard key={box.box_id} box={box} isMain={false} />
                        ))}
                    </div>
                )}
            </div>

            {/* 2. EXTRA SUB-STORIES: Appear BELOW the hero section in a 4-column square grid */}
            {bottomSecondary.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    {bottomSecondary.map((box) => (
                        <StoryCard key={box.box_id} box={box} isMain={false} />
                    ))}
                </div>
            )}
        </section>
    );
}

/* Reusable Square Card Component matching your olive-bar banner style */
function StoryCard({ box, isMain }) {
    const story = box?.story;
    if (!story) return null;

    const imageUrl = story.image_urls?.[0]
        ? `http://localhost:3000${story.image_urls[0]}`
        : "/placeholder-image.png";

    return (
        <Link
            to={`/story/${story.story_id}`}
            className="block relative aspect-square w-full overflow-hidden shadow-md group bg-gray-900"
        >
            <article className="relative aspect-square w-full overflow-hidden shadow-md group bg-gray-900">
                <img
                    src={imageUrl}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Olive-tinted bottom overlay bar matching the screenshot */}
                <div
                    className={
                        isMain
                            ? "absolute inset-x-0 bottom-0 bg-[#6b7537]/80 px-6 py-4 text-white"
                            : "absolute inset-x-0 bottom-0 bg-[#6b7537]/80 px-3 py-2.5 text-white text-center"
                    }
                >
                    <h3
                        className={
                            isMain
                                ? "text-2xl md:text-3xl font-serif font-bold mb-1"
                                : "text-lg md:text-xl font-serif font-bold leading-tight"
                        }
                    >
                        {story.title}
                    </h3>

                    {isMain && (
                        <div
                            className="line-clamp-3 text-xs md:text-sm text-gray-100 mb-2"
                            dangerouslySetInnerHTML={{ __html: story.content || "" }}
                        />
                    )}

                    <span
                        className={
                            isMain
                                ? "block text-center text-xs md:text-sm font-semibold underline-offset-2 group-hover:underline"
                                : "block text-xs font-semibold mt-0.5 underline-offset-2 group-hover:underline"
                        }
                    >
                        Read more
                    </span>
                </div>
            </article>
        </Link>
    );
}

export default HomeStories;