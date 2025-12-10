// React & RN
import React, { FC, useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';

// Navigation
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

// Components
import ProductItem from '@/src/components/ItemsSlider/ItemCard';
import Header from '@/src/components/Header';

// Data
import { products, Product } from '@/src/api/products';

// Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

// Types
type SearchRouteParams = {
  Search: {
    initialQuery?: string;
  };
};

type SearchRouteProp = RouteProp<SearchRouteParams, 'Search'>;

const SearchScreen: FC = () => {
  const route = useRoute<SearchRouteProp>();
  const theme = useTheme();

  const initial: string = route.params?.initialQuery ?? '';

  const [query, setQuery] = useState<string>(initial);
  const [results, setResults] = useState<Product[]>([]);

  const search = (text: string): void => {
    const filtered: Product[] = products.filter(p =>
      p.title.toLowerCase().includes(text.toLowerCase()),
    );
    setResults(filtered);
  };

  useEffect(() => {
    if (initial.length > 0) {
      search(initial);
    }
  }, [initial]);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Header
        title="Пошук"
        isSearchIncluded
        searchValue={query}
        onSearchChange={(text: string): void => {
          setQuery(text);
          search(text);
        }}
        onSearchSubmit={search}
      />

      {!results.length ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Нічого не знайдено</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item: Product) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ProductItem
              id={item.id}
              title={item.title}
              image={item.image}
              badge={item.badge}
              price={item.price}
              oldPrice={item.oldPrice}
              variant="list"
            />
          )}
        />
      )}
    </View>
  );
};

export default SearchScreen;
