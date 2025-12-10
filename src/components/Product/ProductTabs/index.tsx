// React & RN
import { FC } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

//Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

//Types
export interface ProductTab {
  key: string;
  title: string;
}

interface Props {
  tabs: ProductTab[];
  activeTab: string;
  onChange: (value: string) => void;
}

const ProductTabs: FC<Props> = ({ tabs, activeTab, onChange }) => {
  const theme = useTheme();

  return (
    <FlatList
      horizontal
      data={tabs}
      keyExtractor={item => item.key}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const isActive = item.key === activeTab;
        return (
          <TouchableOpacity
            style={[styles.tabItem, isActive && styles.tabActive]}
            onPress={() => onChange(item.key)}
          >
            <Text
              style={[
                styles.tabText,
                isActive && styles.tabTextActive,
                { color: theme.textPrimary },
              ]}
            >
              {item.title}
            </Text>
            {isActive && <View style={styles.underline} />}
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default ProductTabs;
