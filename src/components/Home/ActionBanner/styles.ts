import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  // виходимо за padding лейаута
  wrapper: {
    width: screenWidth,
    alignItems: 'center',
    height: 60,
  },

  // сам банер – завжди на ширину екрану (ширину задаємо в компоненті)
  container: {
    width: screenWidth,
    borderRadius: 0,
    paddingVertical: 12,
    paddingHorizontal: 16,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    position: 'relative',
    minHeight: 44, // ← мінімальна висота, щоб SVG міг розтягнутися
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
});
