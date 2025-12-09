import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },

  heading: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 20,
    color: COLORS.textPrimary,
    paddingHorizontal: 10,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
