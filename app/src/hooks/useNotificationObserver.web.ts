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
  
}
