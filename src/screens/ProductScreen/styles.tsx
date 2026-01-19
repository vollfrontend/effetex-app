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
  optionsWrapper: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  optionBlock: {
    marginTop: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  sizeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeValue: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
    marginBottom: 8,
    backgroundColor: COLORS.cardBackground,
  },
  sizeValueActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  sizeValueText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  sizeValueTextActive: {
    color: COLORS.white,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorCard: {
    width: 100,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
    marginRight: 12,
    marginBottom: 12,
    padding: 8,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
  },
  colorCardActive: {
    borderColor: COLORS.primary,
  },
  colorImage: {
    width: '100%',
    height: 70,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  colorName: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});
