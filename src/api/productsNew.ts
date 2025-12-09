import {
  GetProductsParams,
  GetProductsResponse,
  ProductItem,
  ProductFull,
} from './types';

const API_BASE_URL = 'https://effetex-shop.voll.top/index.php';

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
