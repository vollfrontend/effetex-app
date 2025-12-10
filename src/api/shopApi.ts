// src/api/shopApi.ts

import Config from 'react-native-config';

// Types
import { Language, Category, ProductItem, ProductFull } from './types';

// База: index.php без route.
// У .env має бути ТАК:
//   API_BASE_URL=https://effetex-shop.voll.top/index.php
const BASE_URL: string =
  Config.API_BASE_URL ?? 'https://effetex-shop.voll.top/index.php';

const buildQueryString = (
  params: Record<string, string | number | undefined>,
): string =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join('&');

async function request<T>(
  params: Record<string, string | number | undefined>,
): Promise<T> {
  const queryString: string = buildQueryString(params);
  const url: string = `${BASE_URL}?${queryString}`;

  if (__DEV__) {
    console.log('shopApi request:', url);
  }

  const response: Response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API Error (${response.status}): ${url}`);
  }

  const json: T = (await response.json()) as T;
  return json;
}

/* ===========================
   ENDPOINTS
   =========================== */

// 1) Мови
export function getLanguages(): Promise<Language[]> {
  return request<Language[]>({
    route: `/api/product/getLanguages/`,
  });
}

// 2) Категорії
export function getCategories(languageId?: number): Promise<Category[]> {
  console.log('languageId', languageId);
  console.log('route check', `/api/product/getCategory/language_id=${languageId ?? 1}/`);
  return request<Category[]>({
    route: `/api/product/getCategory/language_id=${languageId ?? 1}/`,
  });
}

// 3) Список товарів (якщо десь ще використовується старий API)
export function getProducts(params?: {
  sort?: string;
  order?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
  category_id?: number;
}): Promise<ProductItem[]> {
  return request<ProductItem[]>({
    route: 'api/product/getProducts',
    sort: params?.sort ?? 'name',
    order: params?.order ?? 'ASC',
    page: params?.page ?? 1,
    limit: params?.limit ?? 20,
    category_id: params?.category_id,
  });
}

// 4) Один товар (повні дані)
export function getProduct(id: number): Promise<ProductFull> {
  return request<ProductFull>({
    route: 'api/product/getProduct',
    id,
  });
}
