import { fetchArticles } from './fetch-articles';
import { ArticlesSection } from './articles-section';
import { ARTICLES_CARDS_HOME_PAGE_LIMIT } from './constants';

export const Articles = async () => {
  let articles;

  try {
    const data = await fetchArticles({ limit: ARTICLES_CARDS_HOME_PAGE_LIMIT });
    articles = data.items;
  } catch {
    return <div className="text-red-500">Error fetching the articles</div>;
  }

  console.log('articles', articles);

  return (
    <ArticlesSection
      title="Articles"
      linkText="Read all articles"
      linkTo="/articles"
      articles={articles}
      headingLevel="h2"
    />
  );
};
