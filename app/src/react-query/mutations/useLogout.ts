import { niknakApi } from "@app/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function logout() {
  await niknakApi.authenticated.logout();

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
