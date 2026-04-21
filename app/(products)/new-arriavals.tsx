import { ErrorBlock } from '../components/error-block';
import { PRODUCTS_CARDS_HOME_PAGE_LIMIT } from './constants';
import { fetchProducts } from './fetch-products';
import { ProductsSection } from './products-section';

export const NewArrivals = async () => {
  let products;

  try {
    const data = await fetchProducts(true, false, undefined, {
      limit: PRODUCTS_CARDS_HOME_PAGE_LIMIT,
    });
    products = data.items;
  } catch (error) {
    return (
      <ErrorBlock
        error={error instanceof Error ? error : new Error(String(error))}
        title="Unable to load new arrivals"
        errorMessage="We couldn't fetch new arrivals right now. Please try again."
      />
    );
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
