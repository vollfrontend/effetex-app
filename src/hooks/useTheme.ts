import { useStore } from '@/src/state/userStore';
import { lightTheme, darkTheme, type Theme } from '@/src/constants/themes';

export const useTheme = (): Theme => {
  const theme = useStore(state => state.settings.theme);
  return theme === 'dark' ? darkTheme : lightTheme;
};

