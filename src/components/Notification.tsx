import { CheckCircle, Trash2, Info } from 'lucide-react';
import type { Notification as NotificationType } from '../hooks/useNotification';

interface NotificationProps {
    notification: NotificationType | null;
    fading: boolean;
}

const iconMap = {
    success: <CheckCircle size={18} />,
    error: <Trash2 size={18} />,
    info: <Info size={18} />,
};

const Notification = ({ notification, fading }: NotificationProps) => {
    if (!notification) return null;

    return (
        <div
            className={`notification notification-${notification.type} ${fading ? 'notification-fade-out' : ''}`}
            key={notification.message}
        >
            <span className="notification-icon">{iconMap[notification.type]}</span>
            <span className="notification-message">{notification.message}</span>
        </div>
    );
};

export default Notification;
