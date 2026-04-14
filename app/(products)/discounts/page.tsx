import { fetchProducts } from '../fetch-products';
import { ContentList } from '../../components/content-list';

export const metadata = {
  title: 'Discounts - Layer Streetwear',
  description: 'Explore our exclusive discounts on stylish streetwear.',
};

const DiscountsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) => {
  return (
    <ContentList
      searchParams={searchParams}
      fetchData={({ pagination }) => fetchProducts(false, true, { pagination })}
      title="Discounts"
      basePath="/discounts"
      errorMessage="Error fetching discounted products"
    />
  );
};

export default DiscountsPage;
