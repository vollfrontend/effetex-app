import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  group: {
    marginBottom: 16,
  },

  groupTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: COLORS.textPrimary,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },

  attrName: {
    width: '50%',
    color: COLORS.textSecondary,
  },

  attrValue: {
    width: '50%',
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
});
