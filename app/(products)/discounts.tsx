import { fetchProducts } from './fetch-products';
import { ProductsSection } from './products-section';
import { randomizeList } from '../utils/randomize-list';

export const Discounts = async () => {
  let products;

  try {
    products = await fetchProducts(false, true);
    products = randomizeList(products);
  } catch {
    return (
      <div className="text-red-500">Error fetching discounted products</div>
    );
  }

  return (
    <ProductsSection
      title="Discounts"
      linkText="All discounts"
      linkTo="/discounts"
      products={products}
      quantity={15}
    />
  );
};
