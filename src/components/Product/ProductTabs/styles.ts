import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  tabItem: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
  },

  tabActive: {},

  tabText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },

  tabTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },

  underline: {
    marginTop: 4,
    height: 3,
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
});
