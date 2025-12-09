// React & RN
import React, { FC } from 'react';
import { View, Text } from 'react-native';

// Styles
import { styles } from './styles';

const ProductDisclaimer: FC = () => {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>Зарядним блоком не комплектується.</Text>
    </View>
  );
};

export default ProductDisclaimer;
