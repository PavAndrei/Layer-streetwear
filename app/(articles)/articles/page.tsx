import { ContentList } from '@/app/components/content-list';
import { fetchArticles } from '../fetch-articles';

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
    <ContentList
      searchParams={searchParams}
      fetchData={() => fetchArticles()}
      title="Articles"
      basePath="/articles"
      errorMessage="Error fetching articles"
      contentType="article"
    />
  );
};

export default ArticlesPage;
