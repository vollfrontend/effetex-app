// React & RN
import React, { FC } from 'react';
import { Text, View } from 'react-native';

// Styles
import { styles } from './styles';

const ProductDelivery: FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.pickup}>
        Самовивіз з магазина Rozetka — <Text style={styles.free}>БЕЗКОШТОВНО</Text>
      </Text>

      <Text style={styles.timer}>
        Замовляйте протягом 16 : 43 : 59 щоб отримати{' '}
        <Text style={styles.bold}>30 листопада з 15:00</Text>
      </Text>
    </View>
  );
};

export default ProductDelivery;
