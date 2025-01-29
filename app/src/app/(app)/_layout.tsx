import { useAuth } from "@app/providers/AuthProvider";
import { Redirect, Stack, useSegments } from "expo-router";

export default function AppLayout() {
  const { session } = useAuth();
  const segments = useSegments();

  console.log("session", session);
  if (!session) {
    return (
      <Redirect
        href={{
          pathname: "/sign-in",
          params: {
            redirectURI: segments.join("/"),
          },
        }}
      />
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="editor"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
