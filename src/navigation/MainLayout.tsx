// src/navigation/MainLayout.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from '@/src/screens/HomeScreen';
import SearchScreen from '@/src/screens/SearchScreen';
import CategoriesScreen from '@/src/screens/CategoriesScreen';
import { CartScreen } from '@/src/screens/CartScreen';
import { FavoritesScreen } from '@/src/screens/FavoritesScreen';
import { ProfileScreen } from '@/src/screens/ProfileScreen';
import { ProductScreen } from '@/src/screens/ProductScreen';
import CategoryProductsScreen from '@/src/screens/CategoryProductsScreen';
import { AuthScreen } from '@/src/screens/AuthScreen';

// Styles
import { styles } from './styles';

// Types
import type { InnerStackParamList } from './innerTypes';
import { View } from 'react-native';

const InnerStack = createNativeStackNavigator<InnerStackParamList>();

export const MainLayout = () => {
  return (
    <View style={styles.container}>
      <InnerStack.Navigator
        screenOptions={{ headerShown: false, contentStyle: styles.content }}
      >
        <InnerStack.Screen name="Home" component={HomeScreen} />
        <InnerStack.Screen name="Search" component={SearchScreen} />
        <InnerStack.Screen name="Categories" component={CategoriesScreen} />
        <InnerStack.Screen name="Cart" component={CartScreen} />
        <InnerStack.Screen name="Favorites" component={FavoritesScreen} />
        <InnerStack.Screen name="Profile" component={ProfileScreen} />
        <InnerStack.Screen name="Product" component={ProductScreen} />
        <InnerStack.Screen
          name="CategoryProducts"
          component={CategoryProductsScreen as any}
        />
        <InnerStack.Screen name="Auth" component={AuthScreen} />
      </InnerStack.Navigator>
    </View>
  );
};
