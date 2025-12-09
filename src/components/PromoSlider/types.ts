export type contentType = {
  title?: string;
  subtitle?: string;
  price?: string;
  credit?: string;
};

export interface SlideItem {
  id: string;
  content?: contentType | null;
  image: string | string[];
}

export interface PromoSliderProps {
  data: SlideItem[];
}
