// Get all wishlist Purchases
export async function getAllWishlistPurchases() {
    const response = await fetch("/api/wishlist-purchases", {
        method: "GET",
        credentials: "include",
    });
    
    if (!response.ok) {
        throw new Error("Failed to fetch Wishlist Purchases");
    }
    
    return await response.json();
}