import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

interface ShowToastOptions {
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

/**
 * Показує toast повідомлення
 */
export const showToast = ({
  type,
  title,
  message,
  duration = 3000,
}: ShowToastOptions) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    visibilityTime: duration,
    position: 'top',
    topOffset: 60,
  });
};

/**
 * Показує успішне повідомлення
 */
export const showSuccess = (title: string, message?: string) => {
  showToast({ type: 'success', title, message });
};

/**
 * Показує повідомлення про помилку
 */
export const showError = (title: string, message?: string) => {
  showToast({ type: 'error', title, message });
};

/**
 * Показує інформаційне повідомлення
 */
export const showInfo = (title: string, message?: string) => {
  showToast({ type: 'info', title, message });
};

/**
 * Приховує всі toast повідомлення
 */
export const hideToast = () => {
  Toast.hide();
};

