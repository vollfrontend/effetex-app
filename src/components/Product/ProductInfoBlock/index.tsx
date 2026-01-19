// React & RN
import React, { FC } from 'react';
import { Text, View } from 'react-native';

// Components
import ProductAvailability from '@/src/components/Product/ProductAvailability';
import ProductPrice from '@/src/components/Product/ProductPrice';

// Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

// Types
import { ProductInfoProps } from './types';

const ProductInfoBlock: FC<ProductInfoProps> = ({ product }) => {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        {product.title}
      </Text>
      <ProductAvailability stock_status={product.stock_status} />
      <ProductPrice
        price={product.price}
        oldPrice={product.oldPrice ?? undefined}
        discount={product.discount}
      />
    </View>
  );
};

export default ProductInfoBlock;
