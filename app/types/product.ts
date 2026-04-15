export interface ProductCardProps {
  _id: string;
  img: string;
  title: string;
  description: string;
  defaultPrice: number;
  discountPrice: number;
  rating: number;
  color: string;
  categories: string[];
  discountPercent?: number;
  hasDiscount?: boolean;
  isNew?: boolean;
  quantity: number;
}

export interface SearchProduct {
  _id: string;
  title: string;
  categories: string[];
}
