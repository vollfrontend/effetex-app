import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  wrapper: {
    height: 70,
    backgroundColor: COLORS.bottomBar,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  productWrapper: {
    height: 70,
    backgroundColor: COLORS.bottomBar,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  buyButton: {
    backgroundColor: '#3BB54A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
