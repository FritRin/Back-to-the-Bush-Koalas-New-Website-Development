import api from "./axios";

// GET all stories
export const getAllStories = async () => {
    const response = await api.get("/stories");
    return response.data.data;
};

// GET story by ID
export const getStoryById = async (id) => {
    const response = await api.get(`/stories/${id}`);
    return response.data.data;
};

// POST Create story
export const createStory = async (formData) => {
    const { data } = await api.post(
        "/stories",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return data;
};

// POST add new image By ID in the array []
export const addStoryImage = async (storyId, imageFile) => {
    const formData = new FormData();

    formData.append("image", imageFile);

    const response = await api.post(
        `/stories/${storyId}/images`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

// PUT update Story By ID
export const updateStory = async (id, payload) => {
    const response = await api.put(`/stories/${id}`, payload);
    return response.data;
};

// PATCH replace imagen BY story ID and index in the images array []
export const updateStoryImage = async (storyId, imageIndex, imageFile) => {
    const formData = new FormData();

    formData.append("image", imageFile);

    const response = await api.patch(
        `/stories/${storyId}/images/${imageIndex}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

// DELETE story By ID
export const deleteStory = async (id) => {
    const response = await api.delete(`/stories/${id}`);
    return response.data;
};

// Delete imagen BY story ID and index in the images array []
export const deleteStoryImage = async (storyId, imageIndex) => {
    const response = await api.delete(`/stories/${storyId}/images/${imageIndex}`);
    return response.data;
};