import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export type Notification<Data extends Record<string, any>> = Omit<
  Notifications.Notification,
  "request"
> & {
  request: Omit<Notifications.Notification["request"], "content"> & {
    content: Omit<Notifications.Notification["request"]["content"], "data"> & {
      data: Data;
    };
  };
};

type UseNotificationObserverOptions<Data extends Record<string, any>> = {
  onNotification: (data: Notification<Data>) => void;
};

export function useNotificationObserver<Data extends Record<string, any>>({
  onNotification,
}: UseNotificationObserverOptions<Data>) {
  useEffect(() => {
    let isMounted = true;

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      onNotification(response.notification as Notification<Data>);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        onNotification(response.notification as Notification<Data>);
      }
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}
