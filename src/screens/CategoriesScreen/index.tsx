// React & RN
import { FC, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '@/src/navigation/types';

// API
import { getCategories } from '@/src/api/shopApi';

// Components
import Header from '@/src/components/Header';

// Hooks
import { useLanguage } from '@/src/hooks/useLanguage';
import { useTheme } from '@/src/hooks/useTheme';

// Types
import { Category } from '@/src/api/types';

// Styles
import { styles } from './styles';
import { COLORS } from '@/src/constants/colors';

const CategoriesScreen: FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const theme = useTheme();
  const { currentLanguageId } = useLanguage();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories on mount and when language changes
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('📦 Loading categories for language ID:', currentLanguageId);
        const data = await getCategories(currentLanguageId);

        console.log('✅ Categories loaded:', data.length);
        setCategories(data);
      } catch (err) {
        setError('Не вдалося отримати категорії');
        console.log('❌ API error:', err);
      } finally {
        setLoading(false);
      }
    };

    // Завантажуємо тільки якщо є ID мови
    if (currentLanguageId > 0) {
      load();
    }
  }, [currentLanguageId]); // Перезавантажувати при зміні мови

  const handlePressCategory = (item: Category): void => {
    navigation.navigate('CategoryProducts', {
      categoryId: item.category_id,
      categoryName: item.name,
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <Header title="Категорії" />

      {/* Content */}
      <FlatList
        data={categories}
        keyExtractor={item => String(item.category_id)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.item, { borderBottomColor: theme.border }]}
            onPress={() => handlePressCategory(item)} // ← ДОДАНО
          >
            <Text style={[styles.title, { color: theme.textPrimary }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoriesScreen;
