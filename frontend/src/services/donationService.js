// Get all donations
export async function getAllDonations() {
    const response = await fetch("http://localhost:3000/api/donations", {
        method: "GET",
        credentials: "include",
    });
    
    if (!response.ok) {
        throw new Error("Failed to fetch Donations");
    }
    
    return await response.json();
}