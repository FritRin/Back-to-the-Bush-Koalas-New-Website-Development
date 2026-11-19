import { useEffect, useState } from "react";
import { getAllBox } from "../../api/Box";
import { getAllStories } from "../../api/Story";
import { sanitizeHTML } from "../../utils/sanitizeHTML";
import BoxStoryCreate from "./BoxStoryCreate";
import BoxStoryUpdate from "./BoxStoryUpdate";
import BoxStoryDelete from "./BoxStoryDelete";

function ManageMainBox(refreshKey) {
    const [mainBox, setMainBox] = useState(null);
    const [stories, setStories] = useState([]);

    useEffect(() => {
         console.log(
        "ManageMainBox refresh:",
        refreshKey
    );
        loadData(refreshKey);
    }, []);

    const loadData = async () => {

        try {
            const boxes = await getAllBox();
            const storiesData = await getAllStories();
            const boxList = Array.isArray(boxes) ? boxes : boxes.data || [];
            const storyList = Array.isArray(storiesData) ? storiesData : storiesData.data || [];
            const main = boxList.find((box) => box.slot === "main") || null;

            if (main) {
                const matchedStory = storyList.find(
                    (story) => story.story_id === main.story_id
                );
                setMainBox({ ...main, story: main.story || matchedStory || null, });
            } else {
                setMainBox(null);
            }
            setStories(storyList);
        } catch (error) {
            console.error("Failed to load main box:", error);
        }
    };



    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Main Story</h2>

            {!mainBox ? (
                /* Reuse Create Component with slot="main" */
                <BoxStoryCreate
                    stories={stories}
                    slot="main"
                    onSuccess={loadData}
                />
            ) : (
                <div className="border-2 rounded-xl overflow-hidden bg-white">
                    {mainBox.story?.image_urls?.[0] && (
                        <img
                            src={`http://localhost:3000${mainBox.story.image_urls[0]}`}
                            alt={mainBox.story.title}
                            className="w-full h-80 object-cover"
                        />
                    )}

                    <div className="p-6">
                        <h3 className="text-3xl font-bold mb-4">
                            {mainBox.story?.title}
                        </h3>

                        <div
                            className="line-clamp-3 text-gray-600 mb-6"
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHTML(mainBox.story?.content),
                            }}

                        />

                        <div className="flex gap-3 pt-4 border-t">
                            {/* Reuse Update Component with slot="main" */}
                            <BoxStoryUpdate
                                box={mainBox}
                                stories={stories}
                                slot="main"
                                onSuccess={loadData}
                            />

                            {/* Reuse Delete Component */}
                            <BoxStoryDelete
                                box={mainBox}
                                onSuccess={loadData}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageMainBox;