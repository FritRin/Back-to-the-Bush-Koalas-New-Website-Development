import { useState } from "react";
import { deleteStory } from "../../api/Story";
import { getAllBox, deleteBox } from "../../api/Box";

function StoryDelete({ story, onClose }) {
    const [loading, setLoading] = useState(false);
    const [isPostedConflict, setIsPostedConflict] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteStory(story.story_id);
            onClose();
            window.location.reload();
        } catch (error) {
            const errorMsg = JSON.stringify(error.response?.data || error.message || "");

            // Detects either our custom 409 response OR the raw PostgreSQL foreign key error
            if (
                error.response?.status === 409 ||
                error.response?.data?.code === "STORY_IN_USE" ||
                errorMsg.includes("box_story_story_id_fkey") ||
                errorMsg.includes("foreign key constraint")
            ) {
                setIsPostedConflict(true);
            } else {
                console.error(error);
                alert("Failed to delete story");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUnpostAndDelete = async () => {
        setLoading(true);
        try {
            const boxes = await getAllBox();
            const boxList = Array.isArray(boxes) ? boxes : boxes.data || [];

            // Find all boxes (main or secondary) currently using this story
            const matchingBoxes = boxList.filter(
                (box) => box.story_id === story.story_id
            );

            // Remove the box assignments first
            for (const box of matchingBoxes) {
                await deleteBox(box.box_id);
            }

            // Delete the story now that the foreign key reference is cleared
            await deleteStory(story.story_id);

            onClose();
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Failed to unpost and delete story");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                bg-black/50
                flex
                items-center
                justify-center
            "
        >
            <div
                className="
                    bg-white
                    rounded-xl
                    p-8
                    max-w-lg
                    w-full
                "
            >
                {!isPostedConflict ? (
                    <>
                        <h2
                            className="
                                text-2xl
                                font-bold
                                mb-4
                            "
                        >
                            Delete Story
                        </h2>

                        <p className="mb-6">
                            Are you sure you want to delete:
                        </p>

                        <p
                            className="
                                font-semibold
                                text-lg
                                mb-8
                            "
                        >
                            {story.title}
                        </p>

                        <div
                            className="
                                flex
                                gap-4
                                justify-end
                            "
                        >
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="
                                    px-4
                                    py-2
                                    border
                                    rounded
                                    disabled:opacity-50
                                "
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={loading}
                                className="
                                    px-4
                                    py-2
                                    bg-red-600
                                    text-white
                                    rounded
                                    disabled:opacity-50
                                "
                            >
                                {loading ? "Deleting..." : "Delete Story"}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2
                            className="
                                text-2xl
                                font-bold
                                text-amber-700
                                mb-4
                            "
                        >
                            Story Already Posted
                        </h2>

                        <p className="mb-4 text-gray-700">
                            <span className="font-semibold">"{story.title}"</span> is
                            currently posted in a Main or Sub Story box. Please delete
                            the post from the box first, or click below to remove it from
                            the box and delete the story permanently.
                        </p>

                        <div
                            className="
                                flex
                                gap-4
                                justify-end
                                mt-8
                            "
                        >
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="
                                    px-4
                                    py-2
                                    border
                                    rounded
                                    disabled:opacity-50
                                "
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleUnpostAndDelete}
                                disabled={loading}
                                className="
                                    px-4
                                    py-2
                                    bg-red-600
                                    text-white
                                    rounded
                                    disabled:opacity-50
                                "
                            >
                                {loading ? "Removing..." : "Delete Post & Story"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default StoryDelete;