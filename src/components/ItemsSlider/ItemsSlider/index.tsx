// React & RN
import { FC, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

// API
import { getProducts } from '@/src/api/products';

// State
import { useStore } from '@/src/state/userStore';

// Components
import ItemCard from '@/src/components/ItemsSlider/ItemCard';

// Styles
import { styles } from './styles';

// Types
import { ItemsSliderProps } from './types';
import { Category, ProductItem } from '@/src/api/types';
import { Product } from '@/src/api/products';

const ItemsSlider: FC<ItemsSliderProps> = ({ title, categoryName }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { categories } = useStore();

  useEffect(() => {
    if (categories.length > 0) {
      setCurrentCategory(
        categories.find(category => category.name === categoryName) ?? null,
      );
    }
  }, [categories, categoryName]);

  // Fetch products on mount
  useEffect(() => {
    if (!currentCategory) return;
    const load = async () => {
      try {
        setLoading(true);
        const data = await getProducts({
          categoryId: Number(currentCategory?.category_id),
        });
        setProducts(
          data.products
            .filter((product: ProductItem) => Number.isFinite(product.id))
            .slice(0, 10)
            .map((product: ProductItem) => {
              const specialPrice = product.special
                ? Number(product.special)
                : null;

              return {
                id: product.id.toString(),
                title: product.name,
                image: product.image,
                badge: '',
                price: specialPrice ?? product.price, // якщо є special → беремо його
                oldPrice: specialPrice ? product.price : undefined,
                discount: specialPrice
                  ? Math.round(
                      ((product.price - specialPrice) / product.price) * 100,
                    )
                  : 0,
              };
            }),
        );
      } catch (err) {
        setError('Не вдалося отримати продукти');
        console.log('API error:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [currentCategory]);

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2E77F0" />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {title && <Text style={styles.heading}>{categoryName}</Text>}

      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
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
            variant="slider"
          />
        )}
      />
    </View>
  );
};

export default ItemsSlider;
