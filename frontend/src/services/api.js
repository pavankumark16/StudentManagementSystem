const API_BASE_URL = "http://localhost:8080";

export async function apiRequest(endpoint, options = {}) {

  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {

    ...options,

    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      ...options.headers
    }

  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

const contentType = response.headers.get("content-type");

if (contentType && contentType.includes("application/json")) {
  return response.json();
}

return response.text();

}