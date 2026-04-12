import { NavigateLink } from '../components/navigate-link';
import { ArticleCardProps } from '../types/article';
import { ArticleCard } from './article-card';

export const ArticlesSection = ({
  title,
  linkTo,
  linkText,
  articles,
  quantity = articles.length,
  headingLevel = 'h1',
}: {
  title: string;
  linkTo?: string;
  linkText?: string;
  articles: ArticleCardProps[];
  quantity?: number;
  headingLevel?: 'h1' | 'h2';
}) => {
  return (
    <section className="mt-10 flex flex-col gap-10 max-w-365 px-2.5 mx-auto w-full">
      <div className="flex items-center justify-between">
        {headingLevel === 'h1' && (
          <h1 className="text-xl font-semibold ">{title}</h1>
        )}
        {headingLevel === 'h2' && (
          <h2 className="text-xl font-semibold ">{title}</h2>
        )}
        {linkTo && linkText && <NavigateLink href={linkTo} text={linkText} />}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {articles.slice(0, quantity).map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </ul>
    </section>
  );
};
