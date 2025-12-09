import { ProductImage } from '@/src/components/Product/ImageSlider/types';
import { ProductAttributeGroup } from '@/src/components/Product/ProductAttributes/types';

export interface ProductFull {
  product_id: string;
  name: string;
  description: string;
  images: ProductImage[];
  attributes: ProductAttributeGroup[];
  price: string;
  special?: string;
}
