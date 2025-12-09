export interface ItemCardProps {
  id: string;
  title: string;
  image: string;
  badge?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  variant?: 'slider' | 'list'; // NEW
}
