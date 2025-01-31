import { niknakApi } from "@app/api";
import { LoginBody, LoginURL } from "@niknak/app-sdk";
import { useMutation } from "@tanstack/react-query";

export async function login(body: LoginBody) {
  const res = await niknakApi.unauthenticated.login(body)

  return res.data
}

export function useLogin() {
  return useMutation<LoginURL, Error, LoginBody>({
    mutationFn: (variables) => login(variables),
    mutationKey: ["login"],
  });
}
