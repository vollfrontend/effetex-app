import { FC, useState, useEffect, useCallback } from 'react';
import { ScrollView, Platform, View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Data
import slidesData from '@/src/data/slides.json';

// API
import { getCategories, getLanguages } from '@/src/api/shopApi';

// i18n
import { useTranslation } from 'react-i18next';

// State
import { useStore } from '@/src/state/userStore';

// Components
import HeaderIOS from '@/src/components/Home/HeaderIOS';
import ActionBanner from '@/src/components/Home/ActionBanner';
import PromoSlider from '@/src/components/PromoSlider';
import PromoBlock from '@/src/components/PromoBlock';
import SearchBar from '@/src/components/SearchBar';
import HomeMenu from '@/src/components/HomeMenu';
import {
  CategoriesIcon,
  OrdersIcon,
  SalesIcon,
  BellIcon,
} from '@/src/components/IconButtons';
import ItemsSlider from '@/src/components/ItemsSlider/ItemsSlider';

// Styles
import { useTheme } from '@/src/hooks/useTheme';

// Types
import { RootStackNavigationProp } from '@/src/navigation/types';

const HomeScreen: FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { t } = useTranslation();
  const { setCategories } = useStore();
  const theme = useTheme();

  const [query, setQuery] = useState<string>('');

  const handleSlidePress = (link: string): void => {
    // Тут можна додати навігацію до відповідної категорії або екрану
    console.log('Slide pressed:', link);
    Alert.alert('Перехід', `Відкриття розділу: ${link}`);
    // Приклад навігації:
    // navigation.navigate('Category', { categoryId: link });
  };

  const menuItems = [
    {
      icon: <CategoriesIcon color={theme.primary} size={24} focused={false} />,
      label: t('homeMenu.categories'),
    },
    {
      icon: <SalesIcon color={theme.primary} size={24} focused={false} />,
      label: t('homeMenu.sales'),
    },
    {
      icon: <BellIcon color={theme.primary} size={24} focused={false} />,
      label: t('homeMenu.notifications'),
    },
    {
      icon: <OrdersIcon color={theme.primary} size={24} focused={false} />,
      label: t('homeMenu.orders'),
    },
  ];

  // Fetch categories on mount
  useEffect(() => {
    const languages = async () => {
      try {
        const data = await getLanguages();

        console.log('languages', data);
      } catch (err) {
        console.log('API error:', err);
      }
    };

    languages();
    const load = async () => {
      try {
        const data = await getCategories(4);

        const categoriesDate = data.map(category => ({
          category_id: category.category_id,
          name: category.name,
          image: category.image ?? '',
        }));

        setCategories(categoriesDate);
      } catch (err) {
        console.log('API error:', err);
      }
    };

    load();
  }, [setCategories]);

  useFocusEffect(
    useCallback(() => {
      setQuery('');
    }, []),
  );

  const handleSubmit = (value: string): void => {
    if (!value.trim()) return;
    navigation.navigate('Search', { initialQuery: value });
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollView: {
      flex: 1,
    },
    text: {
      color: theme.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    content: {
      paddingHorizontal: 16,
    },
    promoContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 10,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        style={dynamicStyles.scrollView}
      >
        {Platform.select({
          ios: <HeaderIOS />,
        })}

        <ActionBanner />

        <PromoSlider
          data={slidesData}
          onSlidePress={handleSlidePress}
          backgroundColor={theme.background}
        />
        <View style={dynamicStyles.content}>
          <View style={dynamicStyles.promoContainer}>
            <PromoBlock
              title="Картка STORE"
              subtitle="Покупки з перевагами"
              image="card"
              color="#312C19"
            />

            <PromoBlock
              title="Підписка Smart"
              subtitle="Безкоштовна доставка"
              image="subscribe"
              color="#212E22"
            />
          </View>

          {Platform.OS === 'android' && (
            <SearchBar
              value={query}
              onChangeText={setQuery}
              onSubmit={handleSubmit}
            />
          )}
          <HomeMenu items={menuItems} />
        </View>

        <ItemsSlider
          title="Рекомендації на основі ваших переглядів"
          categoryName="Новинки"
        />

        <ItemsSlider
          title="Найкращі пропозиції для вас"
          categoryName="ТОП продаж"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
