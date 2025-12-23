// React & RN
import { FC } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

// Components
import {
  CompareIcon,
  CartIcon,
  FavoritesIcon,
} from '@/src/components/IconButtons';

// Styles
import { styles } from './styles';

// Types
import { BottomActionBarProps } from './types';
import { COLORS } from '@/src/constants/colors';

const BottomActionBar: FC<BottomActionBarProps> = ({
  onCompare,
  onCart,
  onWishlist,
  onBuy,
  isFavorite,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconsWrapper}>
        <TouchableOpacity onPress={onCompare} style={styles.iconButton}>
          <CompareIcon color={COLORS.iconDefault} focused={false} size={24} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onCart} style={styles.iconButton}>
          <CartIcon color={COLORS.iconDefault} focused={false} size={24} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onWishlist} style={styles.iconButton}>
          <FavoritesIcon
            color={isFavorite ? COLORS.iconActive : COLORS.iconDefault}
            focused={false}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomActionBar;
