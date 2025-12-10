// React & RN
import React, { FC } from 'react';
import { Text, View } from 'react-native';

// Components
import ProductAvailability from '@/src/components/Product/ProductAvailability';
import ProductPrice from '@/src/components/Product/ProductPrice';
import ProductDelivery from '@/src/components/Product/ProductDelivery';
import ProductPromoBanner from '@/src/components/Product/ProductPromoBanner';
import ProductDisclaimer from '@/src/components/Product/ProductDisclaimer';

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
      <ProductDelivery />
      <ProductPromoBanner />
      <ProductDisclaimer />
    </View>
  );
};

export default ProductInfoBlock;
