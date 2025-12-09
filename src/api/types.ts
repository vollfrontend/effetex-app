// ===========================
// 🌍 Мови
// ===========================
export interface Language {
  language_id: number;
  name: string;
  code: string;
}

// ===========================
// 📂 Категорія
// ===========================
export interface Category {
  category_id: number;
  name: string;
  image: string | null;
}

// =====================================================
// 🟦 КОРОТКИЙ ТОВАР (СПИСОК товарів — getProducts)
// =====================================================
export interface ProductItem {
  id: number; // product_id
  name: string;
  image: string;
  category_id: number;
  price: number;
  special?: string; // може бути null на бекенді
  rating?: number;
  reviews?: number;
  stickers?: string[];
}

// =====================================================
// 🟧 Товар у відповідь на getProducts (старий формат)
// ЗАЛИШАЄМО, бо використовуєш у різних місцях
// =====================================================
export interface ProductItemResponse {
  id: string;
  title: string;
  imageUrl: string;
  price: string;
  specialPrice?: string;
  rating?: number;
  reviewsCount?: number;
  stickers?: string[];
}

// ===========================
// 📌 Параметри запиту товарів
// ===========================
export interface GetProductsParams {
  sort?: string;
  order?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
  categoryId?: number;
}

// ===========================
// 📌 Відповідь getProducts
// ===========================
export interface GetProductsResponse {
  products: ProductItem[];
  total: number;
  page: number;
  limit: number;
}

// =====================================================
// 🟩 Варіант опції
// =====================================================
export interface ProductOptionValue {
  product_option_value_id?: string;
  option_value_id?: string;
  name: string;
  image?: string;
  quantity?: string;
  price?: string;
  price_prefix?: string;
}

// =====================================================
// 🟨 Опція товару
// =====================================================
export interface ProductOption {
  product_option_id: string;
  option_id: string;
  name: string;
  type: string;
  required: string;
  value: string;
  product_option_value: ProductOptionValue[];
}

// =====================================================
// 🟩 Атрибут
// =====================================================
export interface ProductAttributeItem {
  attribute_id: string;
  name: string;
  text: string;
}

// =====================================================
// 🟩 Група атрибутів
// =====================================================
export interface ProductAttributeGroup {
  attribute_group_id: string;
  name: string;
  attribute: ProductAttributeItem[];
}

// =====================================================
// 🟥 ПОВНИЙ ПРОДУКТ (API getProduct)
// =====================================================
export interface ProductFull {
  product_id: string;
  name: string;
  model: string;
  price: string;
  special?: string | null;
  image: string;

  images: Array<{
    product_image_id: string;
    product_id: string;
    image: string;
    sort_order: string;
  }>;

  description: string;
  attributes: ProductAttributeGroup[];
  options: ProductOption[];

  tag: string;
  stock_status: string;
  video_path?: string;
  rating?: number;
  reviews?: number;
  quantity?: string;
  viewed?: string;
}

// =====================================================
// ⭐ НОВЕ: Тип універсального товару для favorites
// =====================================================
// Використовується у Zustand-слайсі замість старого mock Product
export interface FavoriteProduct {
  id: string; // product_id у string форматі
  name: string;
  price: number;
  image: string;
}
