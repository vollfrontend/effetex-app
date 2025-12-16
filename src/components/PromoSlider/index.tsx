// React & RN
import React, { FC, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatList as FlatListType,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';

// Styles
import { styles } from './styles';

// Types
import { SlideItem, PromoSliderProps } from './types';

const { width } = Dimensions.get('window');

const AUTOPLAY_INTERVAL = 3000; // 3 секунди

// Мапінг локальних картинок
const localImages: { [key: string]: ImageSourcePropType } = {
  '1': require('@/assets/images/1.jpg'),
  '2': require('@/assets/images/2.jpg'),
  '3': require('@/assets/images/3.jpg'),
  '4': require('@/assets/images/4.jpg'),
  '5': require('@/assets/images/5.jpg'),
  '6': require('@/assets/images/6.jpg'),
  '7': require('@/assets/images/7.jpg'),
  '8': require('@/assets/images/8.jpg'),
  '9': require('@/assets/images/9.jpg'),
  '10': require('@/assets/images/10.jpg'),
  '11': require('@/assets/images/11.jpg'),
  '12': require('@/assets/images/12.jpg'),
  '13': require('@/assets/images/13.jpg'),
  '14': require('@/assets/images/14.jpg'),
};

const PromoSlider: FC<PromoSliderProps> = ({ data, onSlidePress }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isUserScrolling, setIsUserScrolling] = useState<boolean>(false);

  const flatListRef = useRef<FlatListType<SlideItem>>(null);
  const autoplayRef = useRef<number | null>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const xOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / width);
    setActiveIndex(index);
  };

  const onScrollBeginDrag = (): void => {
    setIsUserScrolling(true);

    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const onScrollEndDrag = (): void => {
    setIsUserScrolling(false);
  };

  /** AUTO PLAY */
  useEffect(() => {
    if (isUserScrolling) return;

    autoplayRef.current = setInterval(() => {
      const nextIndex = activeIndex + 1 >= data.length ? 0 : activeIndex + 1;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [activeIndex, isUserScrolling, data.length]);

  const handleSlidePress = (item: SlideItem): void => {
    if (item.link && onSlidePress) {
      onSlidePress(item.link);
    }
  };

  const getImageSource = (
    image: string | string[],
  ): ImageSourcePropType | { uri: string } => {
    if (typeof image === 'string') {
      // Якщо це локальне зображення
      if (localImages[image]) {
        return localImages[image];
      }
      // Якщо це URL
      return { uri: image };
    }
    return { uri: '' };
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item: SlideItem) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        renderItem={({ item }: { item: SlideItem }) => (
          <TouchableOpacity
            style={styles.slide}
            activeOpacity={0.9}
            onPress={() => handleSlidePress(item)}
          >
            {item.content && (
              <View style={styles.contentContainer}>
                <Text style={styles.title}>{item.content.title}</Text>
                <Text style={styles.subtitle}>{item.content.subtitle}</Text>
                <Text style={styles.price}>{item.content.price}</Text>
                <Text style={styles.credit}>{item.content.credit}</Text>
              </View>
            )}

            {Array.isArray(item.image) ? (
              <View style={styles.imagesContainer}>
                {item.image.map((image: string, idx: number) => (
                  <Image
                    key={idx}
                    source={getImageSource(image)}
                    style={styles.phoneImage}
                    resizeMode="contain"
                  />
                ))}
              </View>
            ) : (
              <>
                <Image
                  source={getImageSource(item.image)}
                  style={styles.slideImage}
                  resizeMode="cover"
                />
                {item.title && (
                  <View style={styles.titleOverlay}>
                    <Text style={styles.slideTitle}>{item.title}</Text>
                  </View>
                )}
              </>
            )}
          </TouchableOpacity>
        )}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        {data.map((_, i: number) => (
          <View
            key={i}
            style={[styles.dot, activeIndex === i && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default PromoSlider;
