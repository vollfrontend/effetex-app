export type InnerStackParamList = {
  Home: undefined;
  Search: { initialQuery?: string } | undefined;
  Categories: undefined;
  Cart: undefined;
  Favorites: undefined;
  Profile: undefined;
  Product: { productId: string };
  BottomBarWrapper: undefined;
  CategoryProducts: { categoryId: number; categoryName: string };
};
