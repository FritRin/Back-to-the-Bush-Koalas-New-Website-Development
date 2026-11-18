import api from "./axios";

export const getAllWishlistItems = async () => {
    const response = await api.get("/wishlist-items");
    return response.data;
};