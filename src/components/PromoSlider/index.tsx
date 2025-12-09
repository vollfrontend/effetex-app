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
} from 'react-native';

// Styles
import { styles } from './styles';

// Types
import { SlideItem, PromoSliderProps } from './types';

const { width } = Dimensions.get('window');

const AUTOPLAY_INTERVAL = 3000; // 3 секунди

const PromoSlider: FC<PromoSliderProps> = ({ data }) => {
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
          <View style={styles.slide}>
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
                    source={{ uri: image }}
                    style={styles.phoneImage}
                    resizeMode="contain"
                  />
                ))}
              </View>
            ) : (
              <Image
                source={{ uri: item.image }}
                style={styles.contentImage}
                resizeMode="contain"
              />
            )}
          </View>
        )}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        {data.map((_, i: number) => (
          <View key={i} style={[styles.dot, activeIndex === i && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
};

export default PromoSlider;
