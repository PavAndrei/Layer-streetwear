import { ProductsSection } from '../(products)/products-section';
import { ErrorBlock } from '../components/error-block';
import { PURCHASES_CARDS_HOME_PAGE_LIMIT } from './constants';
import { fetchUsersPurchases } from './fetch-users-purchases';

export const Purchases = async () => {
  let purchases;

  try {
    const data = await fetchUsersPurchases({
      limit: PURCHASES_CARDS_HOME_PAGE_LIMIT,
    });
    purchases = data.items;
  } catch (error) {
    return (
      <ErrorBlock
        error={error instanceof Error ? error : new Error(String(error))}
        title="Unable to load purchases"
        errorMessage="We couldn't fetch the purchases right now. Please try again."
      />
    );
  }

  return (
    <ProductsSection
      title="Purchases"
      linkText="Show recent purchases"
      linkTo="/purchases"
      products={purchases}
      displayDiscount={false}
      displayNewBadge={false}
      headingLevel="h2"
    />
  );
};
