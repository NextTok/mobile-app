import { useAuth } from "@app/providers/AuthProvider";
import { Redirect, Stack, useSegments } from "expo-router";

export default function AppLayout() {
  const { did } = useAuth();
  const segments = useSegments();

  if (!did) {
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
