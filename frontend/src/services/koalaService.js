// Get all koalas
export async function getAllKoalas() {
    const response = await fetch("http://localhost:3000/api/koalas", {
        method: "GET",
        credentials: "include",
    });
    
    if (!response.ok) {
        throw new Error("Failed to fetch koalas");
    }
    
    return await response.json();
}