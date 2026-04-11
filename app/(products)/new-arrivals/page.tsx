import { fetchProducts } from '../fetch-products';
import { ContentList } from '../../components/content-list';

export const metadata = {
  title: 'New Arrivals - Layer Streetwear',
  description: 'Discover the latest additions to our streetwear collection.',
};
const NewArrivalsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) => {
  return (
    <ContentList
      searchParams={searchParams}
      fetchData={() => fetchProducts(true, false)}
      title="New Arrivals"
      basePath="/new-arrivals"
      errorMessage="Error fetching new arrivals"
    />
  );
};

export default NewArrivalsPage;
