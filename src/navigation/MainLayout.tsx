// src/navigation/MainLayout.tsx

import React, { useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import { useTheme } from '@/src/hooks/useTheme';
import { checkCustomerAuth } from '@/src/api/shopApi';
import { useStore } from '@/src/state/userStore';

// Types
import type { InnerStackParamList } from './innerTypes';

const InnerStack = createNativeStackNavigator<InnerStackParamList>();

const AUTH_TOKEN_CHECK_KEY_PREFIX = 'auth-token-check';
const AUTH_TOKEN_CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000;

export const MainLayout = () => {
  const theme = useTheme();
  const token = useStore(state => state.user?.token);
  const logout = useStore(state => state.logout);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!token) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    let isActive = true;
    const currentToken = token;
    const storageKey = `${AUTH_TOKEN_CHECK_KEY_PREFIX}:${currentToken}`;

    const scheduleNextCheck = (delay: number) => {
      if (!isActive) {
        return;
      }

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        runCheck();
      }, Math.max(delay, 0));
    };

    async function runCheck(force = false) {
      if (!isActive) {
        return;
      }

      const storedTimestamp = await AsyncStorage.getItem(storageKey);
      const lastCheckAt = storedTimestamp ? Number(storedTimestamp) : 0;
      const now = Date.now();

      if (
        !force &&
        lastCheckAt &&
        now - lastCheckAt < AUTH_TOKEN_CHECK_INTERVAL_MS
      ) {
        scheduleNextCheck(AUTH_TOKEN_CHECK_INTERVAL_MS - (now - lastCheckAt));
        return;
      }

      try {
        const response = await checkCustomerAuth(currentToken);
        if (response?.success === false) {
          logout();
          return;
        }
      } catch (error) {
        console.error('Помилка перевірки авторизації:', error);
      } finally {
        await AsyncStorage.setItem(storageKey, String(now));
        scheduleNextCheck(AUTH_TOKEN_CHECK_INTERVAL_MS);
      }
    }

    runCheck(true);

    return () => {
      isActive = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [token, logout]);

  const dynamicStyles = StyleSheet.create({
    container: {
      ...styles.container,
      backgroundColor: theme.background,
    },
    content: {
      ...styles.content,
      backgroundColor: theme.background,
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <InnerStack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: dynamicStyles.content,
        }}
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
