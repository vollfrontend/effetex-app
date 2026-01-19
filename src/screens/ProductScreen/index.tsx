// React & RN
import { FC, useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// API
import { getOneProduct } from '@/src/api/products';

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
import type { ProductFull, ProductOption } from '@/src/api/types';

type Props = NativeStackScreenProps<InnerStackParamList, 'Product'>;

export const ProductScreen: FC<Props> = ({ route }) => {
  const theme = useTheme();

  const sessionId = useStore(state => state.user?.token);
  const productIdStore = useStore(state => state.settings.currentProductId);
  const setCurrentProductId = useStore(state => state.setCurrentProductId);

  // Використовуємо productId з параметрів або зі стору
  const productId = route.params?.productId ?? productIdStore;

  const [product, setProduct] = useState<ProductFull | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('description');
  const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

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

    // Якщо немає токена — можна редіректнути на логін або просто вийти
    if (!sessionId) {
      // navigation.navigate('Login'); // якщо є такий екран
      return;
    }

    if (wishlistLoading) return;

    setWishlistLoading(true);

    // Готуємо дані для локального store
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
        // Видаляємо з favorites (синхронізація з API всередині)
        await removeFromFavorites(String(product.product_id));
      } else {
        // Додаємо до favorites (синхронізація з API всередині)
        await addToFavorites(localItem);
      }
    } catch (e: unknown) {
      console.error('Помилка роботи з wishlist:', e);
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

  // Зберігаємо productId у сторі при зміні
  useEffect(() => {
    if (productId) {
      setCurrentProductId(String(productId));
    }
  }, [productId, setCurrentProductId]);

  useEffect(() => {
    const load = async () => {
      if (!productId) {
        console.log('No productId available');
        setLoading(false);
        return;
      }

      try {
        const productOne: ProductFull = await getOneProduct(Number(productId));
        setProduct(productOne);
      } catch (err) {
        console.log('API error:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [productId]);

  const sizeOption = useMemo<ProductOption | undefined>(() => {
    return product?.options?.find(option =>
      option.name?.toLowerCase().includes('розмір'),
    );
  }, [product]);

  const colorOption = useMemo<ProductOption | undefined>(() => {
    return product?.options?.find(option =>
      option.name?.toLowerCase().includes('кольор'),
    );
  }, [product]);

  const sizeValues = useMemo(
    () => sizeOption?.product_option_value ?? [],
    [sizeOption],
  );

  const colorValues = useMemo(
    () => colorOption?.product_option_value ?? [],
    [colorOption],
  );

  useEffect(() => {
    if (!product) {
      setSelectedSize(null);
      setSelectedColor(null);
      return;
    }

    setSelectedSize(sizeValues[0]?.name ?? null);
    setSelectedColor(colorValues[0]?.name ?? null);
  }, [product, sizeValues, colorValues]);

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

            {(sizeValues.length > 0 || colorValues.length > 0) && (
              <View style={styles.optionsWrapper}>
                {sizeValues.length > 0 && (
                  <View style={styles.optionBlock}>
                    <Text style={[styles.optionTitle, { color: theme.textPrimary }]}>
                      {sizeOption?.name ?? 'Розміри'}
                    </Text>
                    <View style={styles.sizeRow}>
                      {sizeValues.map(value => {
                        const isActive = selectedSize === value.name;
                        const key =
                          value.product_option_value_id ??
                          value.option_value_id ??
                          value.name;
                        return (
                          <TouchableOpacity
                            key={key}
                            style={[
                              styles.sizeValue,
                              isActive && styles.sizeValueActive,
                            ]}
                            onPress={() => setSelectedSize(value.name)}
                          >
                            <Text
                              style={[
                                styles.sizeValueText,
                                isActive && styles.sizeValueTextActive,
                              ]}
                            >
                              {value.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                )}

                {colorValues.length > 0 && (
                  <View style={styles.optionBlock}>
                    <Text style={[styles.optionTitle, { color: theme.textPrimary }]}>
                      {colorOption?.name ?? 'Кольори'}
                    </Text>
                    <View style={styles.colorRow}>
                      {colorValues.map(value => {
                        const isActive = selectedColor === value.name;
                        const imageUri = value.image?.trim()
                          ? value.image
                          : product.image;
                        const key =
                          value.product_option_value_id ??
                          value.option_value_id ??
                          value.name;
                        return (
                          <TouchableOpacity
                            key={key}
                            style={[
                              styles.colorCard,
                              isActive && styles.colorCardActive,
                            ]}
                            onPress={() => setSelectedColor(value.name)}
                          >
                            <Image
                              source={{ uri: imageUri }}
                              style={styles.colorImage}
                            />
                            <Text style={styles.colorName}>{value.name}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                )}
              </View>
            )}

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
