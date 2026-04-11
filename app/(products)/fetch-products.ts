import { ProductCardProps } from '../types/product';

export const fetchProducts = async (isNew?: boolean, hasDiscount?: boolean) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?isNew=${isNew}&hasDiscount=${hasDiscount}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${isNew ?? 'new'} ${hasDiscount ?? 'discount'} products`,
      );
    }

    const products: ProductCardProps[] = await res.json();

    const availableProducts = products.filter(
      (product) => product.quantity > 0,
    );

    return availableProducts;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
