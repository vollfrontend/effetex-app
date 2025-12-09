// React & RN
import React, { FC } from 'react';
import { View, Text } from 'react-native';

// Styles
import { styles } from './styles';

const ProductPromoBanner: FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>-10% при оплаті карткою ПриватБанк від Visa</Text>
    </View>
  );
};

export default ProductPromoBanner;
