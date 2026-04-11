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

  // try {
  //   const articles = await fetchArticles();

  //   return (
  //     <ArticlesSection
  //       title="Articles"
  //       linkText="Back"
  //       linkTo="/"
  //       quantity={8}
  //       articles={articles}
  //     />
  //   );
  // } catch {
  //   return <div className="text-red-500">Error fetching all the articles</div>;
  // }
};

export default ArticlesPage;
