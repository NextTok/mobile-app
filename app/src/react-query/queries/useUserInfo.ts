import env from "@app/env";
import { authenticatedFetch } from "@app/utils/authenticatedFetch";
import { useQuery } from "@tanstack/react-query";

export async function userInfo() {
  const response = await authenticatedFetch(new URL("oauth/userinfo", env.APP_SERVER_URL), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  
  return result as {  };
}

export function useUserInfo() {
  return useQuery<{  }, Error, {}>({
    queryFn: () => userInfo(),
    queryKey: ["userinfo"],
    enabled: false
  });
}
