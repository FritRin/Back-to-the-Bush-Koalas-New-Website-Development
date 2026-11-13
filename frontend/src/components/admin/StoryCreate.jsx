import { useState } from "react";
import { createStory } from "../../api/Story";
import TextEditor from './TextEditor';


function StoryCreate({ onClose, onSuccess }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mainImage, setMainImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [errors, setErrors] = useState({});

    const handleMainImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setMainImage(file);
        }
    };

    const handleGalleryImagesChange = (event) => {
        const files = Array.from(event.target.files);

        if (files.length > 10) {
            alert("Maximum 10 gallery images");
            return;
        }

        setGalleryImages(files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = {};

        if (!title.trim()) {
            validationErrors.title = "Title is required";
        }

        if (
            !content.trim() ||
            content === "<p></p>"
        ) {
            validationErrors.content = "Description is required";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        const formData = new FormData();

        formData.append("admin_id", 1);
        formData.append("title", title);
        formData.append("content", content);

        if (mainImage) {
            formData.append("images", mainImage);
        }

        galleryImages.forEach((image) => {
            formData.append("images", image);
        });

        await createStory(formData);

        if (onSuccess) {
            onSuccess();
        }
        onClose();
    };


    return (
        <div
            className="
        fixed
        inset-0
        z-50
        bg-black/50
        flex
        justify-center
        items-center
      "
        >
            <div
                className="
          bg-white
          w-[90vw]
          h-[90vh]
          rounded-xl
          overflow-y-auto
          p-8
        "
            >
                <div className="flex justify-between mb-8">
                    <h2 className="text-3xl font-bold">
                        Create Story
                    </h2>

                    <button
                        onClick={onClose}
                        type="button"
                    >
                        Close
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                    {/* TITLE */}

                    <div>
                        <label className="block mb-2 font-semibold">
                            Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border rounded p-3"
                        />

                        {/* error feedback missing tittle */}
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* MAIN IMAGE */}

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
                                onChange={handleMainImageChange}
                                className="w-full border-2"
                            />
                        </label>
                    </div>

                    {/* MAIN IMAGE PREVIEW */}

                    {mainImage && (
                        <img
                            src={URL.createObjectURL(mainImage)}
                            alt="Main Preview"
                            className="w-64 h-64 object-cover rounded"
                        />
                    )}

                    {/* GALLERY */}

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
                                multiple
                                onChange={handleGalleryImagesChange}
                                className="w-full border-2"
                            />
                        </label>
                    </div>

                    {/* GALLERY PREVIEW */}

                    <div className="grid grid-cols-5 gap-4">
                        {galleryImages.map((image, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt={`Gallery ${index}`}
                                className="w-full h-32 object-cover rounded"
                            />
                        ))}
                    </div>

                    {/* TIPTAP WILL BE INSERTED HERE */}

                    <div>
                        <label className="block mb-2 font-semibold">
                            Description
                        </label>

                        <div className="border min-h-[300px] rounded p-4">
                            <TextEditor
                                content={content}
                                onChange={setContent}
                            />

                            {/* Erro fedback require text */}
                            {errors.content && (
                                <p className="text-red-500 text-sm mt-2">
                                    {errors.content}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* SAVE */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className=" px-6 py-3 bg-green-600 text-white rounded"
                        >
                            Save Story
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default StoryCreate;