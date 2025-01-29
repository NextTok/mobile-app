import * as SecureStore from "expo-secure-store";

export async function authenticatedFetch(
  input: string | URL | globalThis.Request,
  init?: RequestInit
) {
  const did = await SecureStore.getItemAsync("did");

  console.log("did", did);
  
  if (!did) {
    throw new Error("Not authenticated");
  }

  const headers = {
    ...init?.headers,
    Authorization: `Bearer ${did}`,
  };

  return fetch(input, {
    ...init,
    headers,
  });
}
