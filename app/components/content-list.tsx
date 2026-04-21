import { ProductsSection } from '../(products)/products-section';
import { PAGINATION } from '../(products)/constants';
import { PaginationWrapper } from './pagination-wrapper';
import { ContentItem } from '../types/content';
import { ArticlesSection } from '../(articles)/articles-section';
import { ProductCardProps } from '../types/product';
import { ArticleCardProps } from '../types/article';
import { ErrorBlock } from './error-block';
import { Suspense } from 'react';

type FetchDataResult = {
  items: ContentItem[];
  totalCount: number;
};

export const ContentList = async ({
  searchParams,
  fetchData,
  title,
  basePath,
  errorMessage,
  contentType = 'product',
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
  fetchData: (options: {
    pagination: { startIndex: number; perPage: number };
  }) => Promise<FetchDataResult>;
  title: string;
  basePath: string;
  errorMessage: string;
  contentType?: 'article' | 'product';
}) => {
  const params = await searchParams;
  const page = params?.page;
  const limit = params?.limit ?? String(PAGINATION.PRODUCTS_LIMIT);

  const currentPage = Number(page) || 1;
  const perPage = Number(limit) || PAGINATION.PRODUCTS_LIMIT;
  const startIndex = (currentPage - 1) * perPage;

  let data: FetchDataResult;

  try {
    data = await fetchData({ pagination: { startIndex, perPage } });
  } catch {
    return <ErrorBlock error={new Error(errorMessage)} />;
  }

  const totalPages = Math.ceil(data.totalCount / perPage);

  const content =
    contentType === 'product' ? (
      <ProductsSection
        title={title}
        products={data.items as ProductCardProps[]}
      />
    ) : (
      <ArticlesSection
        title={title}
        articles={data.items as ArticleCardProps[]}
      />
    );

  return (
    <>
      {content}
      {totalPages > 1 && (
        <Suspense fallback={null}>
          <PaginationWrapper
            total={data.totalCount}
            currentPage={currentPage}
            basePath={basePath}
          />
        </Suspense>
      )}
    </>
  );
};
