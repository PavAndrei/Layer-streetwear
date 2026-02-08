import Image from 'next/image';
import mockArticleImage from '@/public/articles/the-roots-of-streetwear.png';
import { ArticleCardProps } from '../types/article';

export const ArticleCard = ({
  article,
  className,
}: {
  article: ArticleCardProps;
  className?: string;
}) => {
  return (
    <li
      className={`relative flex flex-col bg-neutral-800 p-3 rounded text-neutral-50 ${className}`}
    >
      <div className="w-full h-78 max-h-88 bg-neutral-800 flex items-center justify-center rounded mb-4">
        <Image
          src={mockArticleImage}
          alt={article.title}
          fill
          className="rounded max-w-70 max-h-78 object-cover mx-auto mt-2"
        />
      </div>
      <div className="flex flex-col gap-1 items-start justify-between mb-2">
        <div className="text-sm text-neutral-300">
          {new Date(article.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <div className="font-medium text-lg line-clamp-1">{article.title}</div>
        <div className="italic text-base line-clamp-3">{article.text}</div>

        <button
          aria-label="read more"
          className="bg-lime-600 rounded px-2 py-1 hover:bg-lime-500 transition-all duration-100 ease-in cursor-pointer w-full flex items-center justify-center font-medium text-neutral-50 my-3 mb-0 active:scale-95"
        >
          Read more
        </button>
      </div>
    </li>
  );
};
