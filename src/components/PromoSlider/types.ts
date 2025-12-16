export type contentType = {
  title?: string;
  subtitle?: string;
  price?: string;
  credit?: string;
};

export interface SlideItem {
  id: string;
  title?: string;
  content?: contentType | null;
  image: string | string[];
  link?: string;
}

export interface PromoSliderProps {
  data: SlideItem[];
  onSlidePress?: (link: string) => void;
  backgroundColor?: string;
}
