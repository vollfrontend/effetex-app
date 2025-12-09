import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '@/src/constants/colors';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: COLORS.textPrimary,
  },

  imageBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
});
