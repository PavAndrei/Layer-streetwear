import { fetchCategoryProducts } from '@/app/(products)/fetch-products';
import { ContentList } from '@/app/components/content-list';
import { ContentSectionSkeleton } from '@/app/components/skeleton/content-section-skeleton';
import { Suspense } from 'react';
import { CategoriesFilters } from '../../categories-filters';

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
  searchParams: Promise<{
    page?: string;
    limit?: string;
    hasDiscount?: string;
    isNew?: string;
    inStock?: string;
    trending?: string;
  }>;
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const filters = await searchParams;

  const hasDiscount = filters.hasDiscount === 'true';
  const isNew = filters.isNew === 'true';
  const inStock = filters.inStock === 'true';
  const trending = filters.trending === 'true';

  return (
    <div>
      <CategoriesFilters basePath={`/categories/${category}`} />
      <Suspense
        fallback={
          <ContentSectionSkeleton showLink={false} cardVariant="product" />
        }
      >
        <ContentList
          contentType="product"
          searchParams={searchParams}
          fetchData={({ pagination }) =>
            fetchCategoryProducts(
              {
                category,
                inStock,
                isNew,
                hasDiscount,
                trending,
              },
              { pagination },
            )
          }
          title={category}
          basePath={`/categories/${category}`}
          errorMessage="Error fetching discounted products"
        />
      </Suspense>
    </div>
  );
};

export default CategoryPage;
