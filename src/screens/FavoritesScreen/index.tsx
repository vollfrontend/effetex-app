import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// State
import { useStore } from '@/src/state/userStore';

// i18n
import { useTranslation } from 'react-i18next';

// Components
import ItemCard from '@/src/components/ItemsSlider/ItemCard';
import { FavoritesIcon } from '@/src/components/IconButtons';

// Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

export const FavoritesScreen = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const favorites = useStore(state => state.favorites);
  const isLoadingWishlist = useStore(state => state.isLoadingWishlist);
  const fetchWishlist = useStore(state => state.fetchWishlist);
  const user = useStore(state => state.user);
  const theme = useTheme();

  // Завантажуємо wishlist при фокусі на екрані
  useFocusEffect(
    React.useCallback(() => {
      if (user && user.token) {
        fetchWishlist();
      } else {
        console.log(
          'FavoritesScreen: Користувач не авторизований, пропускаємо завантаження',
        );
      }
    }, [user, fetchWishlist]),
  );

  const handleGoShopping = () => {
    navigation.navigate('Home');
  };

  if (isLoadingWishlist) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
            {t('favorites.title')}
          </Text>
        </View>
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (favorites.length === 0) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
            {t('favorites.title')}
          </Text>
        </View>
        <View style={styles.emptyContainer}>
          <FavoritesIcon size={64} color="#ccc" focused={false} />
          <Text style={[styles.emptyText, { color: theme.textPrimary }]}>
            {t('favorites.empty')}
          </Text>
          <TouchableOpacity
            style={styles.goShoppingButton}
            onPress={handleGoShopping}
          >
            <Text style={[styles.goShoppingText, { color: theme.textPrimary }]}>
              {t('favorites.goShopping')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          {t('favorites.title')}
        </Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ItemCard
            id={item.id}
            title={item.title}
            image={item.image}
            badge={item.badge}
            price={item.price}
            oldPrice={item.oldPrice}
            discount={item.discount}
            variant="list"
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.columns}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
