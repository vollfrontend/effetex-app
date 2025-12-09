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

// Types
import { COLORS } from '@/src/constants/colors';

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

const iconColor = (focused: boolean): string =>
  focused ? COLORS.iconActive : COLORS.iconDefault;

export const BottomBar: FC<BottomBarProps> = ({ activeTab, onNavigate }) => {
  return (
    <View style={styles.wrapper}>
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
