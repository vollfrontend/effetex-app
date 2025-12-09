export interface ProductInfoProps {
  product: {
    price: number;
    oldPrice?: number;
    discount: number;
    title: string;
    stock_status: string;
  };
}
