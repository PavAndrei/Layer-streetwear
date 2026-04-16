import { fetchProducts } from './fetch-products';
import { ProductsSection } from './products-section';
import { PRODUCTS_CARDS_HOME_PAGE_LIMIT } from './constants';

export const Discounts = async () => {
  let products;

  try {
    const data = await fetchProducts(false, true, {
      limit: PRODUCTS_CARDS_HOME_PAGE_LIMIT,
    });
    products = data.items;
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
      headingLevel="h2"
    />
  );
};
