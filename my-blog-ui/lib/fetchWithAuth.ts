import { auth } from "@/auth";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const headers = new Headers(options.headers);

  const session = await auth();
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }
  return fetch(url, { ...options, headers });
};
