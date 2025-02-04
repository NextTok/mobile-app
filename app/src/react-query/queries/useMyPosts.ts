import { niknakApi } from "@app/api";
import { Post } from "@niknak/app-sdk";
import { useQuery } from "@tanstack/react-query";

export async function posts() {
  const response = await niknakApi.authenticated.posts();

  return response.data
}

export function usePosts() {
  return useQuery<Post[], Error>({
    queryFn: () => posts(),
    queryKey: ["posts"],
    enabled: true
  });
}
