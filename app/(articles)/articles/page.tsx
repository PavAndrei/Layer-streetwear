import { ContentList } from '@/app/components/content-list';
import { fetchArticles } from '../fetch-articles';
import { Suspense } from 'react';
import { ContentSectionSkeleton } from '@/app/components/skeleton/content-section-skeleton';

export const metadata = {
  title: 'Articles - Layer Streetwear',
  description: 'Read our latest articles on streetwear fashion and trends.',
};

const ArticlesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) => {
  return (
    <Suspense
      fallback={
        <ContentSectionSkeleton
          cardVariant="article"
          itemsCount={12}
          showLink={false}
        />
      }
    >
      <ContentList
        searchParams={searchParams}
        fetchData={({ pagination }) => fetchArticles({ pagination })}
        title="Articles"
        basePath="/articles"
        errorMessage="Error fetching articles"
        contentType="article"
      />
    </Suspense>
  );
};

export default ArticlesPage;
