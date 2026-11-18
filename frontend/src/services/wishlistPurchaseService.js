// Get all wishlist Purchases
export async function getAllWishlistPurchases() {
    const response = await fetch("http://localhost:3000/api/wishlist-purchases", {
        method: "GET",
        credentials: "include",
    });
    
    if (!response.ok) {
        throw new Error("Failed to fetch Wishlist Purchases");
    }
    
    return await response.json();
}