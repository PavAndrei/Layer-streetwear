import { ArticleCardProps } from '../types/article';

export const fetchArticles = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      throw new Error('Failed to fetch articles');
    }

    const articles: ArticleCardProps[] = await res.json();

    return articles;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
