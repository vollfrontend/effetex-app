import {
  GetProductsParams,
  GetProductsResponse,
  ProductItem,
  ProductFull,
} from './types';
import Config from 'react-native-config';

export type Product = {
  id: string;
  title: string;
  badge?: string;
  price: number;
  image: string;
  oldPrice?: number;
  discount?: number;
};

const API_BASE_URL: string =
  Config.API_BASE_URL ?? 'https://effetex-shop.voll.top/index.php';

const buildQueryString = (
  params: Record<string, string | number | undefined>,
): string => {
  return Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join('&');
};

// -------------------------
// LIST PRODUCTS
// -------------------------

type ApiProductShort = {
  product_id: string | number;
  name: string;
  image: string;
  price: string | number;
  special?: string | number | null;
  rating?: number;
  reviews?: number | string;
};

export const getProducts = async (
  params: GetProductsParams,
): Promise<GetProductsResponse> => {
  const queryString = buildQueryString({
    route: 'api/product/getProducts',
    sort: params.sort,
    order: params.order,
    page: params.page,
    limit: params.limit,
    category_id: params.categoryId,
  });

  const url = `${API_BASE_URL}?${queryString}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  const json = await response.json();

  if (!json || typeof json !== 'object' || Array.isArray(json)) {
    return {
      products: [],
      total: 0,
      page: params.page ?? 1,
      limit: params.limit ?? 20,
    };
  }

  const productsMap = json as Record<string, ApiProductShort>;
  const apiProducts = Object.values(productsMap);

  const products: ProductItem[] = apiProducts.map(apiProduct =>
    mapApiProductShort(apiProduct, params.categoryId),
  );

  return {
    products,
    total: products.length,
    page: params.page ?? 1,
    limit: params.limit ?? 20,
  };
};

const mapApiProductShort = (
  product: ApiProductShort,
  categoryId?: number,
): ProductItem => {
  const reviews =
    typeof product.reviews === 'number'
      ? product.reviews
      : typeof product.reviews === 'string'
      ? parseInt(product.reviews, 10)
      : undefined;

  return {
    id: Number(product.product_id),
    name: product.name,
    image: product.image,
    category_id: categoryId ?? 0,
    price: Number(product.price),
    special: product.special ? String(product.special) : undefined,
    rating: product.rating,
    reviews,
    stickers: [],
  };
};

// -------------------------
// ONE PRODUCT
// -------------------------

export const getOneProduct = async (
  productId: number,
): Promise<ProductFull> => {
  const queryString = buildQueryString({
    route: 'api/product/getProduct',
    id: productId,
  });

  const url = `${API_BASE_URL}?${queryString}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  const json = await response.json();

  return mapApiProductFull(json);
};

// -------------------------
// WISHLIST
// -------------------------

type ApiWishlistItem = {
  product_id: string | number;
  price_value?: string | number;
  special_value?: string | number;
  name: string;
  image: string;
  price: string | number;
  special?: string | number | null;
  rating?: number;
  reviews?: number | string;
};

type AddToWishlistResponse = {
  success?: string;
  error?: string;
};

type DeleteFromWishlistResponse = {
  success?: string;
  error?: string;
};

const parseApiWishlistResponse = (data: unknown): ApiWishlistItem[] => {
  if (!data) return [];

  // Якщо масив
  if (Array.isArray(data)) {
    // Перевіряємо чи це масив з об'єктами товарів
    if (data.length > 0 && typeof data[0] === 'object' && data[0] !== null) {
      const firstItem = data[0] as Record<string, unknown>;

      // Якщо перший елемент має product_id - це масив товарів
      if ('product_id' in firstItem) {
        return data.filter((x): x is ApiWishlistItem => {
          if (!x || typeof x !== 'object') return false;
          const obj = x as Record<string, unknown>;
          return (
            'product_id' in obj &&
            'name' in obj &&
            'image' in obj &&
            'price' in obj
          );
        });
      }

      // Інакше це масив з об'єктом, де ключі - числа: [{"0": {...}, "1": {...}}]
      const allItems: ApiWishlistItem[] = [];
      for (const item of data) {
        if (item && typeof item === 'object') {
          const itemObj = item as Record<string, unknown>;
          const values = Object.values(itemObj);
          for (const value of values) {
            if (value && typeof value === 'object') {
              const product = value as Record<string, unknown>;
              if (
                'product_id' in product &&
                'name' in product &&
                'image' in product &&
                'price' in product
              ) {
                allItems.push(product as ApiWishlistItem);
              }
            }
          }
        }
      }
      return allItems;
    }
  }

  // Якщо об'єкт (старий формат)
  if (typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    return Object.values(obj).filter((x): x is ApiWishlistItem => {
      if (!x || typeof x !== 'object') return false;

      const item = x as Record<string, unknown>;
      return (
        'product_id' in item &&
        'name' in item &&
        'image' in item &&
        'price' in item
      );
    });
  }

  return [];
};

export const getWishlist = async (params: {
  sessionId: string;
  languageId?: number;
}): Promise<ProductItem[]> => {
  const queryString = buildQueryString({
    route: 'api/customerwishlist/get',
    token: params.sessionId,
    language_id: params.languageId ?? 1,
  });

  const url = `${API_BASE_URL}?${queryString}`;

  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  const json: unknown = await response.json();

  console.log('getWishlist: отримана відповідь від API:', json);

  // Витягуємо масив products з відповіді
  let productsData: unknown = json;
  if (json && typeof json === 'object' && 'products' in json) {
    console.log('products', json);
    productsData = (json as Record<string, unknown>).products;
    console.log('getWishlist: витягнуто products:', productsData);
  }

  const apiItems = parseApiWishlistResponse(productsData);
  console.log('getWishlist: розпарсено товарів:', apiItems);

  return apiItems.map(item =>
    mapApiProductShort(
      {
        product_id: item.product_id,
        name: item.name,
        image: item.image,
        price: Number(item.price_value ?? 0),
        special: Number(item.special_value ?? 0),
        rating: item.rating,
        reviews: item.reviews,
      },
      0,
    ),
  );
};

export const addToWishlist = async (params: {
  productId: number;
  sessionId: string;
}): Promise<AddToWishlistResponse> => {
  const queryString = buildQueryString({
    route: 'api/customerwishlist/add',
    token: params.sessionId,
  });

  const url = `${API_BASE_URL}?${queryString}`;

  // Конвертуємо body у URLSearchParams для form-encoded формату
  const formBody = `product_id=${encodeURIComponent(params.productId)}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  const json: unknown = await response.json();

  if (!json || typeof json !== 'object') {
    return {};
  }

  return json as AddToWishlistResponse;
};

export const deleteFromWishlist = async (params: {
  productId: number;
  sessionId: string;
}): Promise<DeleteFromWishlistResponse> => {
  const queryString = buildQueryString({
    route: 'api/customerwishlist/delete',
    token: params.sessionId,
  });

  const url = `${API_BASE_URL}?${queryString}`;

  // Конвертуємо body у URLSearchParams для form-encoded формату
  const formBody = `product_id=${encodeURIComponent(params.productId)}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  const json: unknown = await response.json();

  if (!json || typeof json !== 'object') {
    return {};
  }

  return json as DeleteFromWishlistResponse;
};

// -------------------------
// MAP API PRODUCT FULL
// -------------------------
const mapApiProductFull = (data: any): ProductFull => {
  return {
    product_id: data.product_id,
    name: data.name,
    model: data.model,
    price: data.price,
    special: data.special ?? null,
    image: data.image,

    images: Array.isArray(data.images) ? data.images : [],

    description: data.description ?? '',
    attributes: Array.isArray(data.attributes) ? data.attributes : [],
    options: Array.isArray(data.options) ? data.options : [],

    tag: data.tag ?? '',
    stock_status: data.stock_status ?? '',
    video_path: data.video_path,

    rating: data.rating,
    reviews: data.reviews,
    quantity: data.quantity,
    viewed: data.viewed,
  };
};
