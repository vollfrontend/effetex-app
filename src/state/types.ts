// src/state/types.ts

import type { Category, Language } from '@/src/api/types';
import type { Product } from '@/src/api/products';

// Re-export Language for convenience
export type { Language };

// ---------- FAVORITES ----------
export interface FavoritesSlice {
  favorites: Product[];
  addToFavorites: (item: Product) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

// ---------- CATEGORIES ----------
export interface CategoriesSlice {
  categories: Category[];
  addToCategories: (item: Category) => void;
  setCategories: (items: Category[]) => void;
}

// ---------- NAVIGATION ----------
export interface NavigationSlice {
  currentRoute: string | null;
  setCurrentRoute: (route: string) => void;
  isSideMenuOpen: boolean;
  setSideMenuOpen: (isOpen: boolean) => void;
}

// ---------- CART ----------
export interface CartItem extends Product {
  quantity: number;
}

export interface CartSlice {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  changeQuantity: (productId: string, amount: number) => void;
  clearCart: () => void;
}

// ---------- LANGUAGE ----------
// Використовуємо тип Language з API

export interface LanguageSlice {
  availableLanguages: Language[];
  currentLanguage: string; // code з Language
  currentLanguageId: number; // language_id з Language
  isLanguagesLoaded: boolean;
  setAvailableLanguages: (languages: Language[]) => void;
  setCurrentLanguage: (languageCode: string) => void;
  setCurrentLanguageById: (languageId: number) => void;
  getCurrentLanguageObject: () => Language | undefined;
  loadLanguages: () => Promise<void>;
}

// ---------- SETTINGS ----------
export interface SettingsSlice {
  theme: 'light' | 'dark';
  language: 'uk' | 'en';
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'uk' | 'en') => void;
}

// ---------- ROOT ----------
export interface RootState
  extends FavoritesSlice,
    CategoriesSlice,
    NavigationSlice,
    CartSlice,
    LanguageSlice,
    SettingsSlice {}
