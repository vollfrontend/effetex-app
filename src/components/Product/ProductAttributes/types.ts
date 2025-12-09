export interface ProductAttributeItem {
  name: string;
  text: string;
}

export interface ProductAttributeGroup {
  name: string;
  attribute: ProductAttributeItem[];
}
