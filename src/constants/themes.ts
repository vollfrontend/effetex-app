export const lightTheme = {
  primary: '#F57C00', // Orange
  background: '#F5F5F5',
  cardBackground: '#FFFFFF',
  textPrimary: '#1A1A1A',
  textSecondary: '#888888',
  border: '#E5E5E5',
  price: '#E15161', // Red for price
  bottomBar: '#FFFFFF',
  iconDefault: '#2e3230',
  iconActive: '#F57C00',
  success: '#3BB54A',
  white: '#FFFFFF',
  black: '#000000',
  error: '#FF3B30',
};

export const darkTheme = {
  primary: '#F57C00', // Orange (залишається таким самим)
  background: '#1A1A1A',
  cardBackground: '#2A2A2A',
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#3A3A3A',
  price: '#E15161', // Red for price (залишається таким самим)
  bottomBar: '#2A2A2A',
  iconDefault: '#B0B0B0',
  iconActive: '#F57C00',
  success: '#3BB54A',
  white: '#FFFFFF',
  black: '#000000',
  error: '#FF3B30',
};

export type Theme = typeof lightTheme;
