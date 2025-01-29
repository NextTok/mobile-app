import "expo-dev-client";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";

import "react-native-reanimated";

import { useColorScheme } from "@app/hooks/useColorScheme";
import { theme } from "@app/theme";
import { ReactQueryProvider } from "@app/providers/ReactQueryProvider";
import { AuthProvider } from "@app/providers/AuthProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("@assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ReactQueryProvider>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <StyledThemeProvider theme={theme}>
            <Stack initialRouteName="sign-in">
              <Stack.Screen name="sign-in" options={{ headerShown: false }} />
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </StyledThemeProvider>
        </ThemeProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}
