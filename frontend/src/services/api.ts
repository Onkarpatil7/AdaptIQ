
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
  });
}
