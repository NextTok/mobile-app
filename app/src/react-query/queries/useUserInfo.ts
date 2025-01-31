import { niknakApi } from "@app/api";
import { ProfileViewDetailed } from "@niknak/app-sdk";
import { useQuery } from "@tanstack/react-query";

export async function userInfo() {
  const response = await niknakApi.authenticated.userinfo();

  return response.data
}

export function useUserInfo() {
  return useQuery<ProfileViewDetailed, Error>({
    queryFn: () => userInfo(),
    queryKey: ["userinfo"],
    enabled: false
  });
}
