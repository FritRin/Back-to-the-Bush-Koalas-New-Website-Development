import BoxStoryCreate from "./BoxStoryCreate";
import BoxStoryUpdate from "./BoxStoryUpdate";
import BoxStoryDelete from "./BoxStoryDelete";
import { sanitizeHTML } from "../../utils/sanitizeHTML";

function BoxStoryList({ secondaryBoxes, stories, onRefresh }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryBoxes.map((box) => (
                <div
                    key={box.box_id}
                    className="border-2 rounded-xl overflow-hidden bg-white flex flex-col justify-between"
                >
                    {box.story?.image_urls?.[0] && (
                        <img
                            src={box.story.image_urls[0]}
                            alt={box.story.title}
                            className="w-full h-44 object-cover"
                        />
                    )}

                    <div className="p-4 flex flex-col flex-1 justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2">
                                {box.story?.title}
                            </h3>

                            <div
                                className="line-clamp-3 text-sm text-gray-600 mb-4"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHTML(box.story?.content),
                                }}
                            />
                        </div>

                        <div className="flex gap-3 pt-2 border-t">
                            <BoxStoryUpdate
                                box={box}
                                stories={stories}
                                onSuccess={onRefresh}
                            />
                            {/* Ensure this passes box={box}, NOT boxId={box.box_id} */}
                            <BoxStoryDelete
                                box={box}
                                onSuccess={onRefresh}
                            />
                        </div>
                    </div>
                </div>
            ))}

            {/* Card to add new sub-stories */}
            <BoxStoryCreate stories={stories} onSuccess={onRefresh} />
        </div>
    );
}

export default BoxStoryList;