import env from "@app/env";
import { authenticatedFetch } from "@app/utils/authenticatedFetch";
import { useQuery } from "@tanstack/react-query";

export async function me() {
  const response = await authenticatedFetch(new URL("me", env.APP_SERVER_URL), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  
  return result as {  };
}

export function useProfile() {
  return useQuery<{  }, Error, {}>({
    queryFn: () => me(),
    queryKey: ["me"],
    enabled: false
  });
}
