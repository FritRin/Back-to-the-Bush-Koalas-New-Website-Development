// Get all donations
export async function getAllDonations() {
    const response = await fetch("/api/donations", {
        method: "GET",
        credentials: "include",
    });
    
    if (!response.ok) {
        throw new Error("Failed to fetch Donations");
    }
    
    return await response.json();
}