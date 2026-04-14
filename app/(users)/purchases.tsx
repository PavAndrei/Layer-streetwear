import { ProductsSection } from '../(products)/products-section';
import { PURCHASES_CARDS_HOME_PAGE_LIMIT } from './constants';
import { fetchUsersPurchases } from './fetch-users-purchases';

export const Purchases = async () => {
  let purchases;

  try {
    const data = await fetchUsersPurchases({
      limit: PURCHASES_CARDS_HOME_PAGE_LIMIT,
    });
    purchases = data.items;
  } catch {
    return (
      <div className="text-red-500">Error fetching your recent purchases</div>
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
