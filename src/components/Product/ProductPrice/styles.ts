import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  priceWrapper: {
    marginTop: 4,
  },
  price: {
    color: '#FF3B30',
    fontSize: 28,
    fontWeight: '700',
  },
  oldPriceRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#777',
    fontSize: 16,
  },
  discount: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 16,
  },
});
