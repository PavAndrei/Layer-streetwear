import { fetchProducts } from './fetch-products';
import { ProductsSection } from './products-section';
import { PRODUCTS_CARDS_HOME_PAGE_LIMIT } from './constants';
import { ErrorBlock } from '../components/error-block';

export const Discounts = async () => {
  let products;

  try {
    const data = await fetchProducts(false, true, undefined, {
      limit: PRODUCTS_CARDS_HOME_PAGE_LIMIT,
    });
    products = data.items;
  } catch (error) {
    return (
      <ErrorBlock
        error={error instanceof Error ? error : new Error(String(error))}
        title="Unable to load discounts"
        errorMessage="We couldn't fetch the discounts right now. Please try again."
      />
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
