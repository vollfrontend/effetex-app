export interface ItemSliderItem {
  id: string;
  title: string;
  image: string;
  badge?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
}

export interface ItemsSliderProps {
  title?: string;
  categoryName: string;
}
