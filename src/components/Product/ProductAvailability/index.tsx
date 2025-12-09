// React & RN
import React, { FC } from 'react';
import { Text } from 'react-native';

// Styles
import { styles } from './styles';

// Types
import { ProductAvailabilityProps } from './types';

const ProductAvailability: FC<ProductAvailabilityProps> = ({
  stock_status,
}) => {
  return <Text style={styles.inStock}>{stock_status}</Text>;
};

export default ProductAvailability;
