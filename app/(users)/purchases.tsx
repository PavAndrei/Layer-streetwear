import { ProductsSection } from '../(products)/products-section';
import { fetchUsersPurchases } from './fetch-users-purchases';

export const Purchases = async () => {
  let purchases;

  try {
    purchases = await fetchUsersPurchases();
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
      quantity={15}
    />
  );
};
