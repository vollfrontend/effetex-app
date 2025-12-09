import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '@/src/constants/colors';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  image: {
    width,
    height: 300,
    resizeMode: 'contain',
  },
  dotsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.iconDefault,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
  },
});
