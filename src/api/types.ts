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

// =====================================================
// 🔐 АВТОРИЗАЦІЯ
// =====================================================

// Реєстрація користувача
export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  password: string;
}

export interface CustomerData {
  customer_id: string;
  firstname: string;
  lastname: string;
  email: string;
  telephone?: string;
  customer_group_id?: string;
  date_added?: string;
}

export interface RegisterResponse {
  success?: boolean;
  error?: string | Record<string, any>;
  message?: string | Record<string, any>;
  token?: string;
  customer?: CustomerData;
  [key: string]: any; // Для інших можливих полів від API
}

// Логін користувача
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success?: boolean;
  error?: string | Record<string, any>;
  message?: string | Record<string, any>;
  token?: string;
  customer?: CustomerData;
  [key: string]: any; // Для інших можливих полів від API
}

// =====================================================
// 📦 ЗАМОВЛЕННЯ
// =====================================================

export interface MethodOption {
  code: string;
  title: string;
  sort_order?: string;
}

export interface PaymentMethodsResponse {
  payment_methods: Record<string, MethodOption>;
  success: string;
}

export interface ShippingMethodsResponse {
  shipping_methods: Record<string, MethodOption>;
  success: string;
}

export interface OrderAddress {
  firstname: string;
  lastname: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  country: string;
  country_id: number;
  zone_id?: number;
  postcode?: number;
}

export interface OrderCustomer {
  customer_id?: number;
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
}

export interface OrderProductOption {
  product_option_id: number;
  product_option_value_id: number;
  option_id: number;
  option_value_id: number;
  name: string;
  value: string;
}

export interface OrderProduct {
  product_id: number;
  name: string;
  model: string;
  quantity: number;
  price: number;
  total: number;
  option: OrderProductOption[];
}

export interface OrderTotal {
  code: string;
  title: string;
  value: number;
  sort_order: number;
}

export interface CreateOrderRequest {
  customer: OrderCustomer;
  payment_address: OrderAddress;
  payment_method: MethodOption;
  shipping_address: OrderAddress;
  shipping_method: MethodOption;
  products: OrderProduct[];
  totals: OrderTotal[];
  total: number;
  comment?: string;
  currency_code: string;
  currency_id: number;
  currency_value: number;
  order_status_id: number;
}

export interface CreateOrderResponse {
  success: boolean;
  order_id?: number;
  error?: string;
  message?: string;
}
