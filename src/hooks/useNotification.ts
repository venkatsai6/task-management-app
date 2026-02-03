import { useState, useRef, useCallback } from 'react';

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
    message: string;
    type: NotificationType;
}

export const useNotification = () => {
    const [notification, setNotification] = useState<Notification | null>(null);
    const [fading, setFading] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimers = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        if (fadeTimerRef.current) {
            clearTimeout(fadeTimerRef.current);
            fadeTimerRef.current = null;
        }
    };

    const clearNotification = useCallback(() => {
        clearTimers();
        setFading(false);
        setNotification(null);
    }, []);

    const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
        clearTimers();
        setFading(false);
        setNotification({ message, type });

        // Start fade-out after 3 seconds
        timerRef.current = setTimeout(() => {
            setFading(true);

            // Remove after fade-out animation completes (400ms)
            fadeTimerRef.current = setTimeout(() => {
                setNotification(null);
                setFading(false);
                fadeTimerRef.current = null;
            }, 400);

            timerRef.current = null;
        }, 3000);
    }, []);

    return { notification, fading, showNotification, clearNotification };
};
