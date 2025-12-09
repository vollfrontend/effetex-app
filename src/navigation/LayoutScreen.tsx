import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@/src/screens/HomeScreen';
import SearchScreen from '@/src/screens/SearchScreen';
import CategoriesScreen from '@/src/screens/CategoriesScreen';
import { CartScreen } from '@/src/screens/CartScreen';
import { FavoritesScreen } from '@/src/screens/FavoritesScreen';
import { ProfileScreen } from '@/src/screens/ProfileScreen';

import { BottomBarWrapper } from './BottomBarWrapper';
import { styles } from './styles';

const Stack = createNativeStackNavigator();

export const LayoutScreen = () => {
  return (
    <View style={styles.container}>
      {/* Внутрішній стек екранів */}
      <View style={styles.content}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </View>

      {/* Фіксований нижній бар */}
      <BottomBarWrapper />
    </View>
  );
};
