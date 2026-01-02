// src/api/shopApi.ts

import Config from 'react-native-config';

// Types
import {
  Language,
  Category,
  ProductItem,
  ProductFull,
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from './types';

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

  const response: Response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API Error (${response.status}): ${url}`);
  }

  const json: T = (await response.json()) as T;
  return json;
}

async function postRequest<T>(
  route: string,
  body: Record<string, string | number>,
): Promise<T> {
  const url: string = `${BASE_URL}?route=${route}`;

  if (__DEV__) {
    console.log('shopApi POST request:', url, body);
  }

  // Конвертуємо body у URLSearchParams для form-encoded формату
  const formBody = Object.entries(body)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join('&');

  if (__DEV__) {
    console.log('shopApi POST formBody:', formBody);
  }

  const response: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  });

  if (__DEV__) {
    console.log('shopApi POST response status:', response.status);
  }

  if (!response.ok) {
    const text = await response.text();
    console.error('API Error response:', text);
    throw new Error(`API Error (${response.status}): ${url}`);
  }

  const text = await response.text();
  if (__DEV__) {
    console.log('shopApi POST response text:', text);
  }

  try {
    const json: T = JSON.parse(text) as T;
    return json;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    throw new Error('Invalid JSON response from server');
  }
}

/* ===========================
   ENDPOINTS
   =========================== */

// 1) Мови
// API може повертати як масив, так і об'єкт з мовами
export function getLanguages(): Promise<Language[] | Record<string, Language>> {
  return request<Language[] | Record<string, Language>>({
    route: `/api/product/getLanguages/`,
  });
}

// 2) Категорії
export function getCategories(languageId?: number): Promise<Category[]> {
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

// 5) Реєстрація користувача
export function registerCustomer(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  return postRequest<RegisterResponse>('api/customerregister', {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    telephone: data.telephone,
    password: data.password,
  });
}

// 6) Логін користувача
export function loginCustomer(data: LoginRequest): Promise<LoginResponse> {
  return postRequest<LoginResponse>('api/customerlogin', {
    email: data.email,
    password: data.password,
  });
}

export async function checkCustomerAuth(token: string): Promise<void> {
  const url = `${BASE_URL}?route=api/customer/checkAuth&token=${encodeURIComponent(
    token,
  )}`;

  const response: Response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Auth check failed (${response.status}): ${errorText || 'no response body'}`,
    );
  }

  try {
    await response.json();
  } catch (error) {
    console.warn('Failed to parse auth check response:', error);
  }
}
