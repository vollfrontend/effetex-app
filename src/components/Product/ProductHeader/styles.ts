import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.border,
    marginBottom: 20,
  },

  headerAndroid: {
    paddingVertical: 10,
  },

  leftBtn: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  rightBtn: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  title: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },

  icon: {
    width: 22,
    height: 22,
    tintColor: COLORS.textPrimary,
  },
});
