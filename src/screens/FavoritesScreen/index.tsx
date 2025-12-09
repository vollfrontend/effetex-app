import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// State
import { useStore } from '@/src/state/userStore';

// Components
import ItemCard from '@/src/components/ItemsSlider/ItemCard';
import { FavoritesIcon } from '@/src/components/IconButtons';

// Styles
import { styles } from './styles';

// Types
import { RootStackNavigationProp } from '@/src/navigation/types';

export const FavoritesScreen = () => {
  const navigation = useNavigation<any>();
  const favorites = useStore(state => state.favorites);

  const handleGoShopping = () => {
    navigation.navigate('Home');
  };

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
           <Text style={styles.headerTitle}>Обране</Text>
        </View>
        <View style={styles.emptyContainer}>
          <FavoritesIcon size={64} color="#ccc" focused={false} />
          <Text style={styles.emptyText}>Список бажань порожній</Text>
          <TouchableOpacity
            style={styles.goShoppingButton}
            onPress={handleGoShopping}
          >
            <Text style={styles.goShoppingText}>Перейти до покупок</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
         <Text style={styles.headerTitle}>Обране</Text>
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
