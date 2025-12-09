import React, { FC } from 'react';
import { View, Text } from 'react-native';

// Styles
import { styles } from './styles';

// Types
import { HomeMenuItemProps } from './types';

const HomeMenuItem: FC<HomeMenuItemProps> = ({ icon, label }) => {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default HomeMenuItem;
