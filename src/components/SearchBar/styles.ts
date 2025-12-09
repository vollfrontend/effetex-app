import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    borderRadius: 30,
    height: 44,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginHorizontal: 8,
  },

  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  qrButton: {
    marginLeft: 8,
  },
});
