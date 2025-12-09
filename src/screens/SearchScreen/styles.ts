import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  searchContainer: {
    marginBottom: 20,
  },

  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  listContent: {
    paddingTop: 10,
    paddingBottom: 60,
    gap: 15,
  },

  searchTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
});
