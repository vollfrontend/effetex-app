// React & RN
import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

// Components
import ProductCard from '@/src/components/ProductCard';
import Header from '@/src/components/Header';

// Styles
import { styles } from './styles';

// Types
import {
  RootStackParamList,
  RootStackNavigationProp,
} from '@/src/navigation/types';
import { ProductItem } from '@/src/api/types';
import { getProducts } from '@/src/api/productsNew';

type CategoryProductsRoute = RouteProp<RootStackParamList, 'CategoryProducts'>;

interface Props {
  route: CategoryProductsRoute;
}

const PAGE_LIMIT: number = 20;

const CategoryProductsScreen: FC<Props> = ({ route }) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const { categoryId, categoryName } = route.params;

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigation.setOptions({
      title: categoryName,
    });
  }, [categoryName, navigation]);

  const loadProducts = useCallback(
    async (pageToLoad: number, isRefresh: boolean = false) => {
      if (isLoading) {
        return;
      }

      setError(null);

      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const response = await getProducts({
          categoryId,
          page: pageToLoad,
          limit: PAGE_LIMIT,
          order: 'ASC',
        });

        console.log('response', response);

        setHasMore(response.products.length === PAGE_LIMIT);

        setProducts(prev =>
          pageToLoad === 1
            ? response.products
            : [...prev, ...response.products],
        );
        setPage(pageToLoad);
      } catch (e) {
        setError('Не вдалося завантажити товари');

        if (__DEV__) {
          console.log('error', e);
        }
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [categoryId, isLoading],
  );

  useEffect(() => {
    loadProducts(1, true);
  }, [loadProducts]);

  const handleRefresh = useCallback(() => {
    loadProducts(1, true);
  }, [loadProducts]);

  const handleEndReached = useCallback(() => {
    if (!hasMore || isLoading) {
      return;
    }

    loadProducts(page + 1);
  }, [hasMore, isLoading, loadProducts, page]);

  const handleOpenProduct = useCallback(
    (productId: string) => {
      navigation.navigate('Product', { productId });
    },
    [navigation],
  );

  const renderItem = ({ item }: { item: ProductItem }) => (
    <ProductCard
      product={item}
      onPress={() => handleOpenProduct(String(item.id))} // ← тут приводимо до string
    />
  );

  const keyExtractor = (item: ProductItem): string => String(item.id);

  return (
    <View style={styles.container}>
      <Header title={categoryName} />
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={
          isLoading && !isRefreshing ? (
            <View style={styles.footer}>
              <ActivityIndicator />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default CategoryProductsScreen;
