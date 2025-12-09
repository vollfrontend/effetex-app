// RN
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  wrapper: {
    width,
    height: 190,
    backgroundColor: '#0F1737',
    marginBottom: 10,
  },

  slide: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  contentContainer: {
    width: '55%',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  price: {
    color: '#FFFFFF',
    fontSize: 12,
  },

  leftBlock: {
    width: '55%',
  },

  brand: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },

  model: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  subtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 10,
  },

  sale: {
    color: '#FFFFFF',
    fontSize: 12,
  },

  saleAmount: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },

  credit: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 13,
  },

  phoneImage: {
    width: '40%',
    height: '80%',
  },

  contentImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  pagination: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#445',
    borderRadius: 50,
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: '#0f0',
  },

  imagesContainer: {
    width: 100,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
