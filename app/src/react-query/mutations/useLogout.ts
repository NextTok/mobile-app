import env from "@app/env";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function logout() {
  const response = await fetch(new URL("oauth/logout", env.APP_SERVER_URL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  await response.json();

  return true;
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, void>({
    mutationFn: () => logout(),
    mutationKey: ["logout"],
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userinfo"] });
    },
  });
}
