// src/screens/CartScreen/index.tsx
import React, { useMemo } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// State
import { useStore } from '@/src/state/userStore';
import { CartItem } from '@/src/state/types';

// Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

// Icons
import { CartIcon } from '@/src/components/IconButtons';

export const CartScreen = () => {
  const navigation = useNavigation<any>();
  const cart = useStore(state => state.cart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const changeQuantity = useStore(state => state.changeQuantity);
  const theme = useTheme();

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const handleGoShopping = () => {
    navigation.navigate('Home');
  };

  const renderItem = ({ item }: { item: CartItem }) => {
    return (
      <View
        style={[styles.cartItem, { backgroundColor: theme.cardBackground }]}
      >
        <Image
          source={
            item.image && item.image !== 'https://effetex-shop.voll.top/image/'
              ? { uri: item.image }
              : require('../../../assets/images/no-image.png')
          }
          style={styles.itemImage}
        />

        <View style={styles.itemInfo}>
          <View>
            <Text
              style={[styles.itemTitle, { color: theme.textPrimary }]}
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <Text style={[styles.price, { color: theme.textPrimary }]}>
              {item.price} ₴
            </Text>
          </View>

          <View style={styles.controlsRow}>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={[
                  styles.counterButton,
                  { backgroundColor: theme.cardBackground },
                ]}
                onPress={() => changeQuantity(item.id, -1)}
              >
                <Text
                  style={[
                    styles.counterButtonText,
                    {
                      color: theme.textPrimary,
                      backgroundColor: theme.cardBackground,
                    },
                  ]}
                >
                  -
                </Text>
              </TouchableOpacity>

              <Text style={[styles.quantity, { color: theme.textPrimary }]}>
                {item.quantity}
              </Text>

              <TouchableOpacity
                style={[
                  styles.counterButton,
                  { backgroundColor: theme.cardBackground },
                ]}
                onPress={() => changeQuantity(item.id, 1)}
              >
                <Text
                  style={[
                    styles.counterButtonText,
                    {
                      color: theme.textPrimary,
                      backgroundColor: theme.cardBackground,
                    },
                  ]}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => removeFromCart(item.id)}
              style={styles.deleteButton}
            >
              <Text style={[styles.deleteText, { color: theme.textPrimary }]}>
                ×
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          Кошик
        </Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <CartIcon size={64} color="#ccc" focused={false} />
          <Text style={[styles.emptyText, { color: theme.textPrimary }]}>
            Кошик порожній
          </Text>
          <TouchableOpacity
            style={styles.goShoppingButton}
            onPress={handleGoShopping}
          >
            <Text style={[styles.goShoppingText, { color: theme.textPrimary }]}>
              Перейти до покупок
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />

          <View
            style={[styles.footer, { backgroundColor: theme.cardBackground }]}
          >
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: theme.textPrimary }]}>
                Разом:
              </Text>
              <Text style={[styles.totalPrice, { color: theme.textPrimary }]}>
                {totalPrice} ₴
              </Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text
                style={[
                  styles.checkoutButtonText,
                  { color: theme.textPrimary },
                ]}
              >
                Оформити замовлення
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
