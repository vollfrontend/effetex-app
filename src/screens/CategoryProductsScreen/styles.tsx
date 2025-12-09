import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: 4,
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  footer: {
    paddingVertical: 16,
  },
  error: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: COLORS.price,
  },
});
