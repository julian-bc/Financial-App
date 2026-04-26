import { useEffect } from 'react';
import './styles/Notification.css';

interface NotificationProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export default function Notification({ message, duration = 3000, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="notification notification-error">
      <p>{message}</p>
    </div>
  );
}
