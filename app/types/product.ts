export interface ProductCardProps {
  _id: number;
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
}
