import { useEffect, useState } from "react";
import { getAllBox } from "../../api/Box";
import { getAllStories } from "../../api/Story";
import BoxStoryList from "./BoxStoryList";

function ManageSecundaryBox(refreshKey) {
    const [secondaryBoxes, setSecondaryBoxes] = useState([]);
    const [stories, setStories] = useState([]);

    useEffect(() => {
        loadData(refreshKey);
    }, []);

    const loadData = async () => {
        try {
            const boxes = await getAllBox();
            const storiesData = await getAllStories();

            const boxList = Array.isArray(boxes) ? boxes : boxes.data || [];
            const storyList = Array.isArray(storiesData) ? storiesData : storiesData.data || [];

            // Exclude the "main" box and sort newest first (highest box_id at the top)
            const filteredBoxes = boxList
                .filter((box) => box.slot !== "main")
                .sort((a, b) => b.box_id - a.box_id)
                .map((box) => {
                    const matchedStory = storyList.find(
                        (story) => story.story_id === box.story_id
                    );
                    return {
                        ...box,
                        story: box.story || matchedStory || null,
                    };
                });

            setSecondaryBoxes(filteredBoxes);
            setStories(storyList);
        } catch (error) {
            console.error("Failed to load secondary boxes:", error);
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[#4B4C2C]">Sub Stories</h2>

            <BoxStoryList
                secondaryBoxes={secondaryBoxes}
                stories={stories}
                onRefresh={loadData}
            />
        </div>
    );
}

export default ManageSecundaryBox;