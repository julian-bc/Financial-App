import { createContext } from "react";

export interface NotificationContextType {
  message: string | null;
  showNotification: (message: string) => void;
  hideNotification: () => void;
}

export const NotificationContext = createContext<NotificationContextType>({
  message: null,
  showNotification: () => {},
  hideNotification: () => {},
});
