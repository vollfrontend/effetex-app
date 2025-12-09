import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#121212',
  },

  container: {
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },

  logo: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 12,
  },

  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },

  input: {
    flex: 1,
    marginHorizontal: 10,
    color: '#ffffff',
    fontSize: 16,
  },

  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  qrButton: {
    marginLeft: 6,
  },
});
