import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
  },
  pickup: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  free: {
    color: COLORS.success,
    fontWeight: '600',
  },
  timer: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  bold: {
    fontWeight: '700',
  },
});
