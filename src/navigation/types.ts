// src/navigation/types.ts
import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import type {
  BottomTabScreenProps,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

// ---- Root stack (верхній рівень навігації) ----
export type RootStackParamList = {
  MainTabs: undefined;
  Product: { productId: string };
  Search: { initialQuery?: string };
  Categories: undefined;
  CategoryProducts: {
    categoryId: number;
    categoryName: string;
  };
};

// ---- Bottom tabs (нижня навігація) ----
export type BottomTabsParamList = {
  Home: undefined;
  CategoriesHidden: undefined;
  Search: { initialQuery?: string } | undefined;
  Cart: undefined;
  Favorites: undefined;
  Profile: undefined;
};

// ---- Узагальнені props для екранів ----
export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type BottomTabsScreenProps<Screen extends keyof BottomTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

// ---- Конкретні props для екранів табів ----
export type HomeScreenProps = BottomTabsScreenProps<'Home'>;
export type SearchScreenProps = BottomTabsScreenProps<'Search'>;
export type CartScreenProps = BottomTabsScreenProps<'Cart'>;
export type FavoritesScreenProps = BottomTabsScreenProps<'Favorites'>;
export type ProfileScreenProps = BottomTabsScreenProps<'Profile'>;

// ---- Навігації окремо (якщо потрібні тільки navigation-типи) ----
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
export type HomeScreenNavigationProp = BottomTabNavigationProp<
  BottomTabsParamList,
  'Home'
>;

export type InnerStackParamList = {
  Home: undefined;
  Categories: undefined;
  CategoryProducts: {
    categoryId: number;
    categoryName: string;
  };
  Product: {
    productId: string;
  };
};
