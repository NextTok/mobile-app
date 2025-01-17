import { useState, useCallback, useEffect } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { theme } from "@app/theme";

export function useRegisterForPushNotifications() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<Notifications.PermissionStatus | null>(
    null
  );

  const registerForPushNotifications = useCallback(async () => {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: theme.color.primary,
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus: Notifications.PermissionStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();

        finalStatus = status;
      }

      setStatus(finalStatus);

      if (finalStatus !== "granted") {
        return;
      }

      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;

        if (!projectId) {
          throw new Error("Project ID not found");
        }

        const token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;

        setToken(token);
      } catch (e) {
        setError(e as Error);
      }
    }
  }, []);

  useEffect(() => {
      registerForPushNotifications();
  }, []);

  return { registerForPushNotifications, error, token, status };
}
