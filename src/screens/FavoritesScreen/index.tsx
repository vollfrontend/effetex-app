import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

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
  const theme = useTheme();

  const handleGoShopping = () => {
    navigation.navigate('Home');
  };

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
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
