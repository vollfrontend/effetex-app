// React & RN
import { FC, useEffect, useMemo, useState, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// API
import {
  getOneProduct,
  addToWishlist,
  deleteFromWishlist,
} from '@/src/api/products';

// Components
import ProductHeader from '@/src/components/Product/ProductHeader';
import ProductInfoBlock from '@/src/components/Product/ProductInfoBlock';
import ImageSlider from '@/src/components/Product/ImageSlider';
import ProductTabs from '@/src/components/Product/ProductTabs';
import ProductDescription from '@/src/components/Product/ProductDescription';
import ProductAttributes from '@/src/components/Product/ProductAttributes';

// Navigation Types
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { InnerStackParamList } from '@/src/navigation/innerTypes';

// Components
import { ProductBottomBar } from '@/src/components/BottomBar/ProductBottomBar';

// Store
import { useStore } from '@/src/state/userStore';

// Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

// Types
import type { ProductTab } from '@/src/components/Product/ProductTabs';
import type { ProductImage } from '@/src/components/Product/ImageSlider/types';

type Props = NativeStackScreenProps<InnerStackParamList, 'Product'>;

interface ProductAttributeItem {
  name: string;
  text: string;
}

interface ProductAttributeGroup {
  attribute_group_id: string;
  name: string;
  attribute: ProductAttributeItem[];
}

interface Product {
  product_id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  special?: string | null;
  stock_status: string;
  images?: ProductImage[];
  attributes?: ProductAttributeGroup[];
}

export const ProductScreen: FC<Props> = ({ route }) => {
  const { productId } = route.params;
  const theme = useTheme();

  const sessionId = useStore(state => state.user?.token);
  const productIdStore = useStore(state => state.settings.currentProductId);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('description');
  const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);

  const navigation = useNavigation<any>();
  const addToCart = useStore(state => state.addToCart);

  const favorites = useStore(state => state.favorites);
  const addToFavorites = useStore(state => state.addToFavorites);
  const removeFromFavorites = useStore(state => state.removeFromFavorites);

  const isFavorite = useMemo<boolean>(() => {
    if (!product) return false;

    const pid = Number(product.product_id);
    return favorites.some(fav => Number(fav.id) === pid);
  }, [favorites, product]);

  const handleWishlist = useCallback(async (): Promise<void> => {
    if (!product) return;

    const pid = Number(product.product_id);

    // Якщо немає токена — можна редіректнути на логін або просто вийти
    if (!sessionId) {
      // navigation.navigate('Login'); // якщо є такий екран
      return;
    }

    if (wishlistLoading) return;

    setWishlistLoading(true);

    // Готуємо дані для локального store (як у тебе було)
    const localItem = {
      id: String(product.product_id),
      title: product.name,
      image: product.image,
      price: Number(product.special || product.price),
      badge: '',
      oldPrice: product.special ? Number(product.price) : undefined,
      discount: product.special
        ? Math.round(
            ((Number(product.price) - Number(product.special)) /
              Number(product.price)) *
              100,
          )
        : 0,
    };

    try {
      if (isFavorite) {
        // optimistic remove
        removeFromFavorites(String(product.product_id));

        await deleteFromWishlist({
          productId: pid,
          sessionId,
        });

        return;
      }

      // optimistic add
      addToFavorites(localItem);

      await addToWishlist({
        productId: pid,
        sessionId,
      });
    } catch (e: unknown) {
      // rollback, якщо API впало
      if (isFavorite) {
        addToFavorites(localItem);
      } else {
        removeFromFavorites(String(product.product_id));
      }

      console.error(e);
    } finally {
      setWishlistLoading(false);
    }
  }, [
    product,
    sessionId,
    wishlistLoading,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  ]);

  const handleBuy = () => {
    if (!product) return;

    addToCart({
      id: product.product_id,
      title: product.name,
      image: product.image,
      price: Number(product.special || product.price),
      badge: '', // default
      oldPrice: product.special ? Number(product.price) : undefined,
      discount: product.special
        ? Math.round(
            ((Number(product.price) - Number(product.special)) /
              Number(product.price)) *
              100,
          )
        : 0,
    });
    navigation.navigate('Cart');
  };

  const handleOpenCart = () => {
    navigation.navigate('Cart');
  };

  useEffect(() => {
    const load = async () => {
      try {
        const productOne: Product = await getOneProduct(
          Number(productId ?? productIdStore),
        );
        setProduct(productOne);
      } catch (err) {
        console.log('API error:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [productId, productIdStore]);

  if (loading) {
    return (
      <View style={styles.loaderWrapper}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.containerWrapper}>
        <ProductHeader title="Огляд" />
        <Text style={styles.title}>Товар не знайдено</Text>
      </View>
    );
  }

  const price: number = Number(product.special || product.price || 0);
  const oldPriceValue: number | null = product.special
    ? Number(product.price)
    : null;

  // 🔹 Чи є характеристики
  const hasAttributes: boolean = (product.attributes ?? []).length > 0;

  const tabs: ProductTab[] = [
    { key: 'description', title: 'Все про товар' },
    ...(hasAttributes ? [{ key: 'attributes', title: 'Характеристики' }] : []),
  ];

  // 🔹 Формуємо 3 картинки: головна + images[]
  const sliderImages: ProductImage[] = [
    {
      product_image_id: 'main',
      product_id: String(product.product_id ?? productId ?? productIdStore),
      image: product.image,
      sort_order: '1',
    },
    ...(Array.isArray(product.images) ? product.images : []),
  ];

  return (
    <View
      style={[styles.containerWrapper, { backgroundColor: theme.background }]}
    >
      <ProductHeader title={product.name} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <ProductTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* ========================= */}
        {/* Вкладка “Все про товар” */}
        {/* ========================= */}
        {activeTab === 'description' && (
          <>
            <ImageSlider images={sliderImages} />

            <ProductInfoBlock
              product={{
                price,
                oldPrice: oldPriceValue ?? undefined,
                discount: oldPriceValue
                  ? Math.round(100 - (price / oldPriceValue) * 100)
                  : 0,
                title: product.name,
                stock_status: product.stock_status,
              }}
            />

            <ProductDescription html={product.description} />
          </>
        )}

        {/* ========================= */}
        {/* Вкладка “Характеристики” */}
        {/* ========================= */}
        {activeTab === 'attributes' && hasAttributes && (
          <ProductAttributes attributes={product.attributes ?? []} />
        )}
      </ScrollView>

      <ProductBottomBar
        isFavorite={isFavorite}
        onCompare={() => {}}
        onCart={handleOpenCart}
        addToWishlistToggle={handleWishlist}
        onBuy={handleBuy}
      />
    </View>
  );
};
