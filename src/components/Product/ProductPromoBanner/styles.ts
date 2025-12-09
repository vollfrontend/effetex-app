import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  wrapper: {
    marginTop: 14,
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  text: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
