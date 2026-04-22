import { fetchNewArrivalProducts } from '../fetch-products';
import { ContentList } from '../../components/content-list';
import { Suspense } from 'react';
import { ContentSectionSkeleton } from '@/app/components/skeleton/content-section-skeleton';

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
    <Suspense
      fallback={
        <ContentSectionSkeleton showLink={false} cardVariant="product" />
      }
    >
      <ContentList
        searchParams={searchParams}
        fetchData={({ pagination }) => fetchNewArrivalProducts({ pagination })}
        title="New Arrivals"
        basePath="/new-arrivals"
        errorMessage="Error fetching new arrivals"
        contentType="product"
      />
    </Suspense>
  );
};

export default NewArrivalsPage;
