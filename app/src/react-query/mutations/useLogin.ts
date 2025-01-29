import env from "@app/env";
import { useMutation } from "@tanstack/react-query";

export async function login(body: { handle: string }) {
  const response = await fetch(new URL("oauth/login", env.APP_SERVER_URL), {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  return result as { url: string };
}

export function useLogin() {
  return useMutation<{ url: string }, Error, { handle: string }>({
    mutationFn: (variables) => login(variables),
    mutationKey: ["login"],
  });
}
