import env from "@app/env";
import { useQuery } from "@tanstack/react-query";

export async function session() {
  const response = await fetch(new URL("session", env.APP_SERVER_URL), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  return result as { did: string };
}

export function useSession() {
  return useQuery<{ did: string }, Error, void>({
    queryFn: () => session(),
    queryKey: ["session"],
    enabled: false
  });
}
