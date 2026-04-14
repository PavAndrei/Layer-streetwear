import { PRODUCTS_CARDS_HOME_PAGE_LIMIT } from './constants';
import { fetchProducts } from './fetch-products';
import { ProductsSection } from './products-section';

export const NewArrivals = async () => {
  let products;

  try {
    const data = await fetchProducts(true, false, {
      limit: PRODUCTS_CARDS_HOME_PAGE_LIMIT,
    });
    products = data.items;
  } catch {
    return <div className="text-red-500">Error fetching new arrivals</div>;
  }

  return (
    <ProductsSection
      title="New Arrivals"
      linkText="All new arrivals"
      linkTo="/new-arrivals"
      products={products}
      headingLevel="h2"
    />
  );
};
