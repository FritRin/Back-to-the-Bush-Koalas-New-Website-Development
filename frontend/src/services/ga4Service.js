
export async function getWebsiteTraffic() {
    const response = await fetch(
        "http://localhost:3000/api/analytics/traffic",
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch website traffic");
    }

    return await response.json();
}
