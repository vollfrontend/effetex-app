import { FC } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

// i18n
import { useTranslation } from 'react-i18next';

// Hooks
import { useTheme } from '@/src/hooks/useTheme';

// Styles
import { styles } from './styles';
import {
  CompareIcon,
  CartIcon,
  FavoritesIcon,
} from '@/src/components/IconButtons';

// Types
type Props = {
  isFavorite: boolean;
  onCompare: () => void;
  onCart: () => void;
  addToWishlistToggle: () => void;
  onBuy: () => void;
};

export const ProductBottomBar: FC<Props> = ({
  isFavorite,
  onCompare,
  onCart,
  addToWishlistToggle,
  onBuy,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.productWrapper, { backgroundColor: theme.bottomBar }]}>
      <TouchableOpacity onPress={onCompare}>
        <CompareIcon color={theme.iconDefault} size={24} focused={false} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onCart}>
        <CartIcon color={theme.iconDefault} size={24} focused={false} />
      </TouchableOpacity>

      <TouchableOpacity onPress={addToWishlistToggle}>
        <FavoritesIcon
          color={isFavorite ? theme.iconActive : theme.iconDefault}
          size={24}
          focused={false}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.buyButton} onPress={onBuy}>
        <Text style={styles.buyButtonText}>{t('productBottomBar.buyNow')}</Text>
      </TouchableOpacity>
    </View>
  );
};
