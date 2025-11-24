export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiFetch(path: string, options?: RequestInit) {
  const url = `${API_URL}${path}`;
  return fetch(url, options);
}
