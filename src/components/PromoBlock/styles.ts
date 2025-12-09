import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '50%',
    height: 45,
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    flexShrink: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },

  phoneImage: {
    width: 24,
    height: 24,
    borderRadius: 8,
  },

  content: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 2,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 9,
    color: '#fff',
  },
});
