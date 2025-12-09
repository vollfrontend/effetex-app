// React & RN
import React, { FC } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';

// Types
import { Product } from '@/src/api/products';

// Styles
import { styles } from './styles';

interface SearchResultsProps {
  results: Product[];
  onSelect: (id: string) => void;
}

const SearchResults: FC<SearchResultsProps> = ({ results, onSelect }) => {
  if (results.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Нічого не знайдено</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={results}
      keyExtractor={(item: Product) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={() => onSelect(item.id)}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price} $</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default SearchResults;
