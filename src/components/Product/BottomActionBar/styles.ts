import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1A1A1A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
  },

  iconsWrapper: {
    flexDirection: 'row',
    gap: 20,
  },

  iconButton: {
    padding: 8,
  },

  icon: {
    fontSize: 24,
    color: '#fff',
  },

  buyButton: {
    backgroundColor: '#43A047',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },

  buyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
