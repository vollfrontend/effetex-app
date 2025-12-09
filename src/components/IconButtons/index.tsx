import React from 'react';
import type { SvgProps } from 'react-native-svg';

import HomeSvg from '@assets/icons/home.svg';
import SearchSvg from '@assets/icons/search.svg';
import CartSvg from '@assets/icons/cart.svg';
import FavoritesSvg from '@assets/icons/favorites.svg';
import ProfileSvg from '@assets/icons/user.svg';
import MicSvg from '@assets/icons/mic.svg';
import QrCodeSvg from '@assets/icons/scan.svg';
import CategoriesSvg from '@assets/icons/categories.svg';
import OrdersSvg from '@assets/icons/orders.svg';
import SalesSvg from '@assets/icons/sales.svg';
import BellSvg from '@assets/icons/bell.svg';
import CardSvg from '@assets/images/card.svg';
import SubscriptionSvg from '@assets/images/subscribe.svg';
import BackSvg from '@assets/icons/back.svg';
import ShareSvg from '@assets/icons/share.svg';
import CompareSvg from '@assets/icons/compare.svg';

export type TabIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

// 🎯 Тепер фабрика приймає baseSize
const createIcon = (
  SvgComponent: React.FC<SvgProps>,
  width: number,
  height: number,
) => {
  return ({ color }: TabIconProps) => {
    return <SvgComponent width={width} height={height} color={color} />;
  };
};

// 👇 Окремий розмір для кожної іконки!
export const HomeIcon = createIcon(HomeSvg, 32, 32);
export const SearchIcon = createIcon(SearchSvg, 26, 26);
export const CartIcon = createIcon(CartSvg, 30, 30);
export const FavoritesIcon = createIcon(FavoritesSvg, 30, 30);
export const ProfileIcon = createIcon(ProfileSvg, 30, 30);
export const MicIcon = createIcon(MicSvg, 22, 22);
export const QrCodeIcon = createIcon(QrCodeSvg, 26, 26);
export const CardIcon = createIcon(CardSvg, 24, 24);
export const SubscriptionIcon = createIcon(SubscriptionSvg, 24, 24);
export const CategoriesIcon = createIcon(CategoriesSvg, 24, 24);
export const OrdersIcon = createIcon(OrdersSvg, 24, 24);
export const SalesIcon = createIcon(SalesSvg, 24, 24);
export const BellIcon = createIcon(BellSvg, 24, 24);
export const BackIcon = createIcon(BackSvg, 24, 24);
export const ShareIcon = createIcon(ShareSvg, 24, 24);
export const CompareIcon = createIcon(CompareSvg, 28, 28);
export const HiddenTabButtonIcon = createIcon(FavoritesSvg, 0, 0);
