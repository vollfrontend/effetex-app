// React & RN
import { FC, useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// API
import { getOneProduct } from '@/src/api/productsNew';

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

// Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

// Types
import type { ProductTab } from '@/src/components/Product/ProductTabs';
import type { ProductImage } from '@/src/components/Product/ImageSlider/types';
import { ProductBottomBar } from '@/src/components/BottomBar/ProductBottomBar';
import { useStore } from '@/src/state/userStore';

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

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('description');

  const navigation = useNavigation<any>();
  const addToCart = useStore(state => state.addToCart);

  const favorites = useStore(state => state.favorites);
  const addToFavorites = useStore(state => state.addToFavorites);
  const removeFromFavorites = useStore(state => state.removeFromFavorites);

  const isFavorite = product
    ? favorites.some(fav => fav.id === product.product_id)
    : false;

  const handleWishlist = () => {
    if (!product) return;

    if (isFavorite) {
      removeFromFavorites(product.product_id);
    } else {
      addToFavorites({
        id: product.product_id,
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
      });
    }
  };

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
        const productOne: Product = await getOneProduct(Number(productId));
        setProduct(productOne);
      } catch (err) {
        console.log('API error:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [productId]);

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
      product_id: String(product.product_id ?? productId),
      image: product.image,
      sort_order: '1',
    },
    ...(Array.isArray(product.images) ? product.images : []),
  ];

  console.log('product-description', product.description);

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
        onWishlist={handleWishlist}
        onBuy={handleBuy}
      />
    </View>
  );
};
