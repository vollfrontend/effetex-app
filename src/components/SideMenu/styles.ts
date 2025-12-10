import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '@/src/constants/colors';

const { width, height } = Dimensions.get('window');
const MENU_WIDTH = width * 0.75;

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: MENU_WIDTH,
    height: height,
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 30,
  },
  signInButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  menuItemValue: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export const CONFIG = {
  MENU_WIDTH,
};
