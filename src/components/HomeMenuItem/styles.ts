import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  itemWrapper: {
    alignItems: 'center',
    width: 75,
  },

  iconWrapper: {
    width: 48,
    height: 48,
    // backgroundColor: '#333',
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  label: {
    color: COLORS.textPrimary,
    fontSize: 12,
  },
});
