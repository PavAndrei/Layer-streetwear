import mockArticles from '@/app/data/articles-database.json';
import { ArrowRightIcon } from '../icons/arrow-right-icon';
import { ArticleCard } from './article-card';

export const Articles = () => {
  const articles = mockArticles.articles;

  return (
    <section className="flex flex-col gap-10 max-w-365 px-2.5 mx-auto w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold ">New Articles</h2>
        <div className="flex items-center gap-5">
          <span>All new articles</span>
          <ArrowRightIcon />
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {articles.slice(0, 8).map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </ul>
    </section>
  );
};
