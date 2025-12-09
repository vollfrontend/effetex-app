import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  card: {
    width: 160,
    borderColor: COLORS.border,
    padding: 10,
    backgroundColor: COLORS.cardBackground,
    position: 'relative',
    borderWidth: 1,
    borderStyle: 'solid',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },

  listCard: {
    padding: 10,
    width: '49%',
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
    borderStyle: 'solid',
    overflow: 'hidden',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBackground,
  },

  badge: {
    backgroundColor: '#FFB84C',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 6,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },

  imageContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 8,
    marginBottom: 8,
  },

  image: {
    width: '100%',
    height: 90,
    borderRadius: 8,
    marginBottom: 8,
  },

  title: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    minHeight: 40,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },

  oldPrice: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },

  price: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.price,
  },

  buyButton: {
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  discount: {
    fontSize: 12,
    fontWeight: '500',
    backgroundColor: '#FFB84C',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    color: '#000',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
});
