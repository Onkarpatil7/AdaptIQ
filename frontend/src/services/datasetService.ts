
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function uploadDataset(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${API_URL}/api/v1/datasets/upload`,
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || `Upload failed (${response.status})`
    );
  }

  return data;
}
