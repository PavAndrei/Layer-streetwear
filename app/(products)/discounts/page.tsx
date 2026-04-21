import { fetchProducts } from '../fetch-products';
import { ContentList } from '../../components/content-list';
import { Suspense } from 'react';
import { ContentSectionSkeleton } from '@/app/components/skeleton/content-section-skeleton';

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
    <Suspense
      fallback={
        <ContentSectionSkeleton showLink={false} cardVariant="product" />
      }
    >
      <ContentList
        searchParams={searchParams}
        fetchData={({ pagination }) =>
          fetchProducts(false, true, undefined, { pagination })
        }
        title="Discounts"
        basePath="/discounts"
        errorMessage="Error fetching discounted products"
      />
    </Suspense>
  );
};

export default DiscountsPage;
