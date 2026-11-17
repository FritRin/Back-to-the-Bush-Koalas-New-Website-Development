import { useEffect, useState } from "react";
import { getStoryById, updateStory, updateStoryImage, addStoryImage, deleteStoryImage, } from "../../api/Story";
import TextEditor from "./TextEditor";
// import { sanitizeHTML } from "../../utils/sanitizeHTML";

function StoryUpdate({ storyId, onClose }) {

    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [images, setImages] = useState([]);

    useEffect(() => {
        loadStory();
    }, [storyId]);

    const loadStory = async () => {
        try {

            const story = await getStoryById(storyId);

            setTitle(story.title || "");
            setContent(story.content || "");

            setImages(story.image_urls || []);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {

            await updateStory(storyId, { title, content, });

            alert("Story updated");

        } catch (error) {
            console.error(error);
        }
    };

    const handleReplaceImage = async (imageIndex, file) => {
        try {

            await updateStoryImage(storyId, imageIndex, file);

            await loadStory();

        } catch (error) {
            console.error(error);
        }
    };

    const handleAddGalleryImage = async (file) => {
        try {

            await addStoryImage(storyId, file);

            await loadStory();

        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteImage = async (imageIndex) => {
        try {

            await deleteStoryImage(storyId, imageIndex);

            await loadStory();

        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                bg-black/50
                p-8
            "
        >
            <div
                className="
                    h-full
                    rounded-xl
                    overflow-hidden
                "
            >
                <div
                    className="
                        grid
                        grid-cols-2
                        h-full
                    "
                >

                    {/* LEFT SIDE */}

                    <div
                        className="
                            bg-white
                            overflow-y-auto
                            p-8
                            border-r
                        "
                    >
                        <div className="flex justify-between mb-6">

                            <h2 className="text-2xl font-bold">
                                Edit Story
                            </h2>

                            <button
                                onClick={onClose}
                                type="button"
                            >
                                Close
                            </button>

                        </div>

                        <label>
                            Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="
                                w-full
                                border
                                rounded
                                p-3
                                mb-6
                            "
                        />

                        <h3 className="font-semibold mb-2">
                            Main Image
                        </h3>

                        {images[0] && (
                            <img
                                src={`http://localhost:3000${images[0]}`}
                                alt=""
                                className="w-full h-64 object-cover rounded mb-3
                            "/>
                        )}

                        <div className="max-w-xl">
                            <label className="
                            flex flex-col 
                            items-center 
                            justify-center 
                            w-full 
                            h-32 
                            border-2 
                            border-dashed 
                            border-gray-300 
                            rounded-lg 
                            cursor-pointer 
                            bg-gray-50 
                            hover:bg-gray-100 
                            transition-colors
                        ">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <p className="mb-2 text-sm text-gray-500 font-semibold">Click to upload </p>
                                    <p className="text-xs text-gray-400">PNG or JPG</p>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleReplaceImage(0, e.target.files[0])}
                                />
                            </label>
                        </div>

                        <h3 className="font-semibold mt-8 mb-4">
                            Gallery
                        </h3>

                        <div className="grid grid-cols-3 gap-4">

                            {images.slice(1).map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={`http://localhost:3000${image}`}
                                        alt=""
                                        className="w-full h-28 object-cover rounded" />
                                    <button
                                        onClick={() =>
                                            handleDeleteImage(index + 1)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )
                            )}

                        </div>

                        <div className="max-w-xl">
                            <label className="
                            flex flex-col 
                            items-center 
                            justify-center 
                            w-full 
                            h-32 
                            border-2 
                            border-dashed 
                            border-gray-300 
                            rounded-lg 
                            cursor-pointer 
                            bg-gray-50 
                            hover:bg-gray-100 
                            transition-colors
                        ">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <p className="mb-2 text-sm text-gray-500 font-semibold">Click to upload </p>
                                    <p className="text-xs text-gray-400">PNG or JPG</p>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="mt-4"
                                    onChange={(e) =>
                                        handleAddGalleryImage(
                                            e.target.files[0]
                                        )
                                    }
                                />
                            </label>
                        </div>
                        <div className="mt-8">

                            <TextEditor
                                content={content}
                                onChange={setContent}
                            />

                        </div>

                        <button
                            type="button"
                            onClick={handleSave}
                            className="
                                mt-8
                                px-6
                                py-3
                                bg-green-600
                                text-white
                                rounded
                            ">
                            Save Changes
                        </button>
                    </div>

                    {/* LIVE PREVIEW */}

                    <div
                        className=" bg-[#EEF2DB]
                            overflow-y-auto
                            p-8
                        "
                    >
                        {images[0] && (
                            <img
                                src={`http://localhost:3000${images[0]}`}
                                alt=""
                                className="
                                    w-full
                                    h-80
                                    object-cover
                                    rounded
                                    mb-8
                                "/>
                        )}

                        <div className="grid grid-cols-3 gap-4 mt-8">
                            {images.slice(1).map((image, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:3000${image}`}
                                    alt=""
                                    className="h-32 w-full object-cover rounded" />
                            ))}
                        </div>
                        <h1 className="text-4xl font-bold mb-6">
                            {title}
                        </h1>

                        <div className="overflow-y-auto p-8">
                            <div className="max-w-4xl mx-auto">
                                {/*
                            this method will print the HTML text
                            from the database, but will tranform the HTML in clean text
                            for example: <p>Hello</p> -- >  "Hello"
                            will make invisible the HTML tags
                            */}
                                <div
                                    className="story-preview-content"
                                    // dangerouslySetInnerHTML={{
                                    //     __html: sanitizeHTML(content),
                                    // }}
                                    dangerouslySetInnerHTML={{__html: content,}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoryUpdate;