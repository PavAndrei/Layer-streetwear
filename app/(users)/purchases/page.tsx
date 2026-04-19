import { Suspense } from 'react';
import { fetchUsersPurchases } from '../fetch-users-purchases';
import { ContentList } from '@/app/components/content-list';
import { ContentSectionSkeleton } from '@/app/components/skeleton/content-section-skeleton';

const PurchasesPage = async ({
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
        fetchData={({ pagination }) => fetchUsersPurchases({ pagination })}
        title="Purchases"
        basePath="/purchases"
        errorMessage="Error fetching your purchases"
      />
    </Suspense>
  );
};

export default PurchasesPage;
