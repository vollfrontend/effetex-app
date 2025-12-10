// React & RN
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';

// Icons
import {
  HomeIcon,
  SearchIcon,
  CartIcon,
  FavoritesIcon,
  ProfileIcon,
  // CategoriesIcon,
} from '@/src/components/IconButtons';

// Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

type BottomBarProps = {
  activeTab: BottomTabKey;
  onNavigate: (screen: BottomTabNavigate) => void;
};

// Ключі для активності
export type BottomTabKey =
  | 'home'
  | 'search'
  | 'categories'
  | 'cart'
  | 'favorites'
  | 'profile'
  | 'none';

// Куди можемо переходити
export type BottomTabNavigate =
  | 'Home'
  | 'Search'
  | 'Categories'
  | 'Cart'
  | 'Favorites'
  | 'Profile';

export const BottomBar: FC<BottomBarProps> = ({ activeTab, onNavigate }) => {
  const theme = useTheme();

  const iconColor = (focused: boolean): string =>
    focused ? theme.iconActive : theme.iconDefault;

  const dynamicStyles = {
    wrapper: {
      ...styles.wrapper,
      backgroundColor: theme.bottomBar,
      borderTopColor: theme.border,
    },
  };

  return (
    <View style={dynamicStyles.wrapper}>
      <TouchableOpacity onPress={() => onNavigate('Home')}>
        <HomeIcon
          color={iconColor(activeTab === 'home')}
          size={28}
          focused={activeTab === 'home'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onNavigate('Search')}>
        <SearchIcon
          color={iconColor(activeTab === 'search')}
          size={26}
          focused={activeTab === 'search'}
        />
      </TouchableOpacity>

      {/* Кнопки категорій немає */}

      <TouchableOpacity onPress={() => onNavigate('Cart')}>
        <CartIcon
          color={iconColor(activeTab === 'cart')}
          size={26}
          focused={activeTab === 'cart'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onNavigate('Favorites')}>
        <FavoritesIcon
          color={iconColor(activeTab === 'favorites')}
          size={26}
          focused={activeTab === 'favorites'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onNavigate('Profile')}>
        <ProfileIcon
          color={iconColor(activeTab === 'profile')}
          size={26}
          focused={activeTab === 'profile'}
        />
      </TouchableOpacity>
    </View>
  );
};
