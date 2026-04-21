import { fetchProducts } from '@/app/(products)/fetch-products';
import { ContentList } from '@/app/components/content-list';
import { ContentSectionSkeleton } from '@/app/components/skeleton/content-section-skeleton';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return {
    title: `${category} - Layer Streetwear`,
    description: `Explore our exclusive discounts on ${category}.`,
  };
}

const CategoryPage = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  return (
    <Suspense
      fallback={
        <ContentSectionSkeleton showLink={false} cardVariant="product" />
      }
    >
      <ContentList
        contentType="product"
        searchParams={searchParams}
        fetchData={({ pagination }) =>
          fetchProducts(undefined, undefined, category, { pagination })
        }
        title={category}
        basePath={`/categories/${category}`}
        errorMessage="Error fetching discounted products"
      />
    </Suspense>
  );
};

export default CategoryPage;
