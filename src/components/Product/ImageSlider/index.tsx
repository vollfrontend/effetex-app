// React & RN
import { FC, useState } from 'react';
import {
  View,
  Image,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from 'react-native';

// Styles
import { styles } from './styles';

// Types
import type { ProductImage } from './types';

interface Props {
  images: ProductImage[];
}

const { width } = Dimensions.get('window');

const ImageSlider: FC<Props> = ({ images }) => {
  const [index, setIndex] = useState<number>(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(
      e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width,
    );
    setIndex(slideIndex);
  };

  return (
    <View>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={item => item.product_image_id}
        style={{ width }}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.image} />
        )}
      />

      {images.length > 1 && (
        <View style={styles.dotsWrapper}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, index === i && styles.dotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default ImageSlider;
