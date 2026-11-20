
export async function getWebsiteTraffic() {
    const response = await fetch(
        "/api/analytics/traffic",
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

export async function getTrafficSources() {
  const response = await fetch(
    "/api/analytics/sources",
    { method: "GET", credentials: "include" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch traffic sources");
  }

  return await response.json();
}

export async function getVisitorDevices() {
  const response = await fetch(
    "/api/analytics/devices",
    { method: "GET", credentials: "include" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch visitor devices");
  }

  return await response.json();
}

export async function getUserEngagement() {
  const response = await fetch(
    "/api/analytics/engagement",
    { method: "GET", credentials: "include" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user engagement");
  }

  return await response.json();
}
