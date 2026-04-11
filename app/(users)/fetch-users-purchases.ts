import { ProductCardProps } from '../types/product';

export const fetchUsersPurchases = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/purchases`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      throw new Error('Failed to fetch user purchases');
    }

    const products: ProductCardProps[] = await res.json();

    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
