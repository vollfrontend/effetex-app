import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: 'relative',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
