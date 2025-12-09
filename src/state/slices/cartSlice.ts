import { RootState, CartSlice } from '../types';
import { Product } from '@/src/api/products';
import { logZustandAction } from '../zustandLogger';

type StoreSet = (partial: RootState | Partial<RootState>) => void;
type StoreGet = () => RootState;

export const createCartSlice = (
  set: StoreSet,
  get: StoreGet,
): CartSlice => ({
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

    logZustandAction<RootState, 'cart'>(
      'cart/add',
      'cart',
      cart,
      nextCart,
    );

    set({ cart: nextCart });
  },

  removeFromCart: (productId: string) => {
    const { cart } = get();
    const nextCart = cart.filter(item => item.id !== productId);

    logZustandAction<RootState, 'cart'>(
        'cart/remove',
        'cart',
        cart,
        nextCart,
    );

    set({ cart: nextCart });
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
