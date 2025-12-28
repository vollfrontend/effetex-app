import { RootState, CartSlice } from '../types';
import { Product } from '@/src/api/products';
import { logZustandAction } from '../zustandLogger';
import { showSuccess } from '@/src/utils/toast';
import i18next from 'i18next';

type StoreSet = (partial: RootState | Partial<RootState>) => void;
type StoreGet = () => RootState;

export const createCartSlice = (set: StoreSet, get: StoreGet): CartSlice => ({
  cart: [],

  addToCart: (product: Product) => {
    const { cart } = get();
    const existingItem = cart.find(item => item.id === product.id);

    let nextCart;
    if (existingItem) {
      nextCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      nextCart = [...cart, { ...product, quantity: 1 }];
    }

    logZustandAction<RootState, 'cart'>('cart/add', 'cart', cart, nextCart);

    set({ cart: nextCart });

    showSuccess(i18next.t('cart.addedToCart'), product.title);
  },

  removeFromCart: (productId: string) => {
    const { cart } = get();
    const removedItem = cart.find(item => item.id === productId);
    const nextCart = cart.filter(item => item.id !== productId);

    logZustandAction<RootState, 'cart'>('cart/remove', 'cart', cart, nextCart);

    set({ cart: nextCart });

    if (removedItem) {
      showSuccess(i18next.t('cart.removedFromCart'), removedItem.title);
    }
  },

  changeQuantity: (productId: string, amount: number) => {
    const { cart } = get();
    const nextCart = cart
      .map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
      .filter(item => item.quantity > 0);

    // Simple log, not differentiating increase/decrease
    /* logZustandAction<RootState, 'cart'>(
        'cart/changeQuantity',
        'cart',
        cart,
        nextCart,
      ); */

    set({ cart: nextCart });
  },

  clearCart: () => {
    set({ cart: [] });
  },
});
