import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  scrollView: {
    paddingBottom: 120, // щоб не перекривав BottomActionBar
  },

  imageContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingVertical: 16,
  },

  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
    backgroundColor: '#eaeaea',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 20,
    textAlign: 'center',
  },
});
