import { fetchArticles } from './fetch-articles';
import { ArticlesSection } from './articles-section';
import { ARTICLES_CARDS_HOME_PAGE_LIMIT } from './constants';
import { ErrorBlock } from '../components/error-block';

export const Articles = async () => {
  let articles;

  try {
    const data = await fetchArticles({ limit: ARTICLES_CARDS_HOME_PAGE_LIMIT });
    articles = data.items;
  } catch (error) {
    return (
      <ErrorBlock
        error={error instanceof Error ? error : new Error(String(error))}
        title="Unable to load articles"
        errorMessage="We couldn't fetch the articles right now. Please try again."
      />
    );
  }

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
