
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

interface LoginPayload {
  email: string;
  password: string;
  remember_me: boolean;
}

interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
}

async function request(
  endpoint: string,
  payload: object
) {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(payload)
    });
  } catch {
    throw new Error(
      "Cannot connect to the backend. Check whether FastAPI is running."
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = data.detail;
    const message =
      typeof detail === "string"
        ? detail
        : Array.isArray(detail)
          ? detail.map((item: { msg?: string }) => item.msg).join(", ")
          : "Request failed. Please try again.";

    throw new Error(message);
  }

  return data;
}

export function loginUser(payload: LoginPayload) {
  return request("/api/v1/auth/login", payload);
}

export function registerUser(payload: RegisterPayload) {
  return request("/api/v1/auth/register", payload);
}



import { apiFetch } from "./api";

export interface AuthUser {
  id: string;
  full_name: string;
  email: string;
  is_active: boolean;
}


export async function getCurrentUser() {
  const response = await apiFetch("/api/v1/auth/me");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Authentication required");
  }

  return data;
}

export async function logoutUser() {
  const response = await apiFetch("/api/v1/auth/logout", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  return true;
}