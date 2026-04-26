import { useState, type ReactNode } from "react";
import { NotificationContext, type NotificationContextType } from "./NotificationContext";
import Notification from "../components/Notification";

type Props = {
  children: ReactNode;
};

function NotificationProvider({ children }: Props) {
  const [message, setMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setMessage(msg);
  };

  const hideNotification = () => {
    setMessage(null);
  };

  const value: NotificationContextType = {
    message,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {message && (
        <Notification message={message} onClose={hideNotification} />
      )}
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
