// RN
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  wrapper: {
    width,
    height: 350,
    boxSizing: 'border-box',
    marginBottom: 10,
    paddingBottom: 20,
  },

  sliderContainer: {
    width: '100%',
    height: '100%',
    overflow: 'visible',
    position: 'relative',
  },

  slide: {
    width: width,
    height: 330,
    position: 'relative',
    overflow: 'hidden',
  },

  slideImage: {
    width: '100%',
    height: '100%',
  },

  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  slideTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  contentContainer: {
    width: '55%',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: width,
    borderRadius: 0,
    paddingVertical: 12,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120, // ← мінімальна висота, щоб SVG міг розтягнутися
  },

  // SVG-заливка поверх container
  gradient: {
    height: 60,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  white: {
    color: '#FFFFFF',
  },
  yellow: {
    color: '#FFD500',
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
    bottom: 0,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dot: {
    width: 8,
    height: 8,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 50,
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: 'orange',
    width: 10,
    height: 10,
  },

  imagesContainer: {
    width: 100,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Кнопки навігації
  navButton: {
    borderStyle: 'solid',
    position: 'absolute',
    borderRadius: 60,
    top: '50%',
    borderWidth: 2,
    transform: [{ translateY: -30 }],
    zIndex: 10,
  },

  navButtonLeft: {
    left: 8,
  },

  navButtonRight: {
    right: 8,
  },

  arrow: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },

  arrowText: {
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 34,
  },
});
