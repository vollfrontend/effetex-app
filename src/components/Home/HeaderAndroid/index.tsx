import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const HeaderAndroid: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HeaderAndroid</Text>
    </View>
  );
};

export default HeaderAndroid;
