// React & RN
import React, { FC } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// Styles
import { styles } from './styles';

// Types
import { ProductCardProps } from './types';

const ProductCard: FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.imageWrapper}>
        {product.stickers && product.stickers.length > 0 && (
          <View style={styles.badgeWrapper}>
            <Text style={styles.badgeText}>{product.stickers[0]}</Text>
          </View>
        )}

        <Image
          source={
            product.image &&
            product.image !== 'https://effetex-shop.voll.top/image/'
              ? { uri: product.image }
              : require('../../../assets/images/no-image.png')
          }
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.name}
        </Text>

        {typeof product.rating === 'number' && (
          <Text style={styles.rating}>
            {product.rating?.toFixed(1)} • {product.reviews ?? 0} відгуків
          </Text>
        )}

        <View style={styles.priceWrapper}>
          <Text style={styles.price}>{product.special ?? product.price} ₴</Text>

          {product.special && (
            <Text style={styles.oldPrice}>{product.price} ₴</Text>
          )}
        </View>

        <Text style={styles.delivery}>Безкоштовна доставка</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
