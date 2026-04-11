import { ProductsSection } from '../(products)/products-section';
import { PAGINATION } from '../(products)/constants';
import { PaginationWrapper } from './pagination-wrapper';
import { ContentItem } from '../types/content';
import { ArticlesSection } from '../(articles)/articles-section';
import { ProductCardProps } from '../types/product';
import { ArticleCardProps } from '../types/article';

export const ContentList = async ({
  searchParams,
  fetchData,
  title,
  basePath,
  errorMessage,
  contentType = 'product',
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
  fetchData: () => Promise<ContentItem[]>;
  title: string;
  basePath: string;
  errorMessage: string;
  contentType?: 'article' | 'product';
}) => {
  const params = await searchParams;
  const page = params?.page;
  const limit = params?.limit || PAGINATION.PRODUCTS_LIMIT;

  const currentPage = Number(page) || 1;
  const perPage = Number(limit);
  const startIndex = (currentPage - 1) * perPage;

  let items: ContentItem[];

  try {
    items = await fetchData();
  } catch {
    return <div className="text-red-500">{errorMessage}</div>;
  }

  const paginatedItems = items.slice(startIndex, startIndex + perPage);

  const content =
    contentType === 'product' ? (
      <ProductsSection
        title={title}
        linkText="Back"
        linkTo="/"
        products={paginatedItems as ProductCardProps[]}
      />
    ) : (
      <ArticlesSection
        title={title}
        linkText="Back"
        linkTo="/"
        articles={paginatedItems as ArticleCardProps[]}
      />
    );

  return (
    <>
      {content}
      {items.length > perPage && (
        <PaginationWrapper
          total={items.length}
          currentPage={currentPage}
          basePath={basePath}
        />
      )}
    </>
  );
};
