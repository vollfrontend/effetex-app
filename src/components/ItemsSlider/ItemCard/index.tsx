// React & RN
import { FC } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';

// State
import { useStore } from '@/src/state/userStore';

// Components
import { CartIcon } from '@/src/components/IconButtons';

// Styles
import { styles } from './styles';

// Types
import { ItemCardProps } from './types';
import { RootStackNavigationProp } from '@/src/navigation/types';

const ItemCard: FC<ItemCardProps> = ({
  id,
  title,
  image,
  badge,
  price,
  oldPrice,
  variant,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const addToCart = useStore(state => state.addToCart);

  const openProduct = (): void => {
    navigation.navigate('Product', { productId: id });
  };

  const handleBuyPress = () => {
    addToCart({
      id,
      title,
      image: image || '',
      badge,
      price,
      oldPrice,
      discount: 0, // Default or passed prop
    });
  };

  return (
    <TouchableOpacity
      style={[styles.card, variant === 'list' && styles.listCard]}
      activeOpacity={0.8}
      onPress={openProduct}
    >
      {/* {discount && <Text style={styles.discount}>{discount}%</Text>} */}

      <View style={styles.imageContainer}>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}

        <Image
          source={
            image && image !== 'https://effetex-shop.voll.top/image/'
              ? { uri: image }
              : require('../../../../assets/images/no-image.png')
          }
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      <View style={styles.priceContainer}>
        <View>
          {oldPrice && <Text style={styles.oldPrice}>{oldPrice} ₴</Text>}
          <Text style={styles.price}>{price} ₴</Text>
        </View>

        {variant !== 'slider' && (
          <TouchableOpacity
            style={styles.buyButton}
            onPress={handleBuyPress}
          >
            <CartIcon color="#fff" size={20} focused={false} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;
