import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from '@/src/screens/HomeScreen';
import SearchScreen from '@/src/screens/SearchScreen';
import { CartScreen } from '@/src/screens/CartScreen';
import { FavoritesScreen } from '@/src/screens/FavoritesScreen';
import { ProfileScreen } from '@/src/screens/ProfileScreen';
import CategoriesScreen from '@/src/screens/CategoriesScreen';
import { renderHiddenTabButton } from '@/src/components/HiddenTabButton';

// Components
import {
  HomeIcon,
  SearchIcon,
  CartIcon,
  FavoritesIcon,
  ProfileIcon,
} from '@/src/components/IconButtons';

// Styles
import { styles } from './styles';

// Types
import type { BottomTabsParamList } from '@/src/navigation/types';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#10B5E8',
        tabBarInactiveTintColor: '#fff',
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeIcon,
          sceneStyle: { backgroundColor: '#1A1A1A' },
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: SearchIcon,
          sceneStyle: { backgroundColor: '#1A1A1A' },
        }}
      />

      <Tab.Screen
        name="CategoriesHidden"
        component={CategoriesScreen}
        options={{
          headerShown: false,
          tabBarButton: renderHiddenTabButton, // ✔ немає дірки
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: 9,
          tabBarIcon: CartIcon,
          sceneStyle: { backgroundColor: '#1A1A1A' },
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: FavoritesIcon,
          sceneStyle: { backgroundColor: '#1A1A1A' },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ProfileIcon,
          sceneStyle: { backgroundColor: '#1A1A1A' },
        }}
      />
    </Tab.Navigator>
  );
};
