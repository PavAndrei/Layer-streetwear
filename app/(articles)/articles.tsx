import { fetchArticles } from './fetch-articles';
import { ArticlesSection } from './articles-section';

export const Articles = async () => {
  let articles;

  try {
    articles = await fetchArticles();
  } catch {
    return <div className="text-red-500">Error fetching the articles</div>;
  }

  return (
    <ArticlesSection
      title="Articles"
      linkText="Read all articles"
      linkTo="/articles"
      quantity={15}
      articles={articles}
    />
  );
};
