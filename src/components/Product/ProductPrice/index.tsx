// React & RN
import { FC } from 'react';
import { View, Text } from 'react-native';

// Styles
import { styles } from './styles';

// Types
interface Props {
  price: number;
  oldPrice?: number;
  discount: number;
}

const ProductPrice: FC<Props> = ({ price, oldPrice, discount }) => {
  return (
    <View style={styles.priceWrapper}>
      <Text style={styles.price}>{price.toLocaleString()} ₴</Text>

      {oldPrice && (
        <View style={styles.oldPriceRow}>
          <Text style={styles.oldPrice}>{oldPrice.toLocaleString()} ₴</Text>
          <Text style={styles.discount}>{discount}%</Text>
        </View>
      )}
    </View>
  );
};

export default ProductPrice;
