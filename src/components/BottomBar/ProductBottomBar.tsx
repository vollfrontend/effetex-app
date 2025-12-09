import React, { FC } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import {
  CompareIcon,
  CartIcon,
  FavoritesIcon,
} from '@/src/components/IconButtons';

type Props = {
  isFavorite: boolean;
  onCompare: () => void;
  onCart: () => void;
  onWishlist: () => void;
  onBuy: () => void;
};

import { COLORS } from '@/src/constants/colors';

// ... imports

export const ProductBottomBar: FC<Props> = ({
  isFavorite,
  onCompare,
  onCart,
  onWishlist,
  onBuy,
}) => {
  return (
    <View style={styles.productWrapper}>
      <TouchableOpacity onPress={onCompare}>
        <CompareIcon color={COLORS.iconDefault} size={24} focused={false} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onCart}>
        <CartIcon color={COLORS.iconDefault} size={24} focused={false} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onWishlist}>
        <FavoritesIcon
          color={isFavorite ? COLORS.iconActive : COLORS.iconDefault}
          size={24}
          focused={false}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.buyButton} onPress={onBuy}>
        <Text style={styles.buyButtonText}>Купити зараз</Text>
      </TouchableOpacity>
    </View>
  );
};
