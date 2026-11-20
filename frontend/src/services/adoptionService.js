// Get all adoptions
export async function getAllAdoptions() {
    const response = await fetch("/api/adoptions", {
        method: "GET",
        credentials: "include",
    });
    
    if (!response.ok) {
        throw new Error("Failed to fetch Adoptions");
    }
    
    return await response.json();
}