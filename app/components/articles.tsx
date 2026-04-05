import { ArrowRightIcon } from '../icons/arrow-right-icon';
import { ArticleCard } from './article-card';
import { ArticleCardProps } from '../types/article';
import { NavigateLink } from './navigate-link';

export const Articles = async () => {
  let articles: ArticleCardProps[] = [];
  let error = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`);
    articles = await res.json();
  } catch (err) {
    error = 'Failed to fetch articles';
    console.log(err);
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <section className="flex flex-col gap-10 max-w-365 px-2.5 mx-auto w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold ">New Articles</h2>
        {/* <div className="flex items-center gap-5">
          <span>All new articles</span>
          <ArrowRightIcon />
        </div> */}
        <NavigateLink href="/articles" text="All new articles" />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {articles.slice(0, 8).map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </ul>
    </section>
  );
};
