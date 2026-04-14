type ContentSectionSkeletonProps = {
  itemsCount?: number;
  showHeader?: boolean;
  showLink?: boolean;
  cardVariant?: 'product' | 'article' | 'category';
  className?: string;
};

export const ContentSectionSkeleton = ({
  itemsCount = 12,
  showHeader = true,
  showLink = true,
  cardVariant = 'product',
  className = '',
}: ContentSectionSkeletonProps) => {
  const skeletonItems = Array.from({ length: itemsCount });

  return (
    <section
      className={`mx-auto mt-10 flex w-full max-w-365 flex-col gap-10 px-2.5 ${className}`}
    >
      {showHeader && (
        <div className="flex items-center justify-between gap-4">
          <div className="h-7 w-32 animate-pulse rounded bg-neutral-800" />

          {showLink && (
            <div className="h-6 w-24 animate-pulse rounded bg-neutral-800" />
          )}
        </div>
      )}

      <ul className="grid-container">
        {skeletonItems.map((_, index) => (
          <li
            key={index}
            className="min-h-80 rounded bg-neutral-800 p-3 text-neutral-50"
          >
            {cardVariant === 'product' && <ProductCardSkeleton />}
            {cardVariant === 'article' && <ArticleCardSkeleton />}
            {cardVariant === 'category' && <CategoryCardSkeleton />}
          </li>
        ))}
      </ul>
    </section>
  );
};

const ProductCardSkeleton = () => {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="relative overflow-hidden rounded bg-neutral-700">
        <div className="aspect-4/5 animate-pulse bg-neutral-700" />
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <div className="h-5 w-2/3 animate-pulse rounded bg-neutral-700" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-neutral-700" />
      </div>
    </div>
  );
};

const ArticleCardSkeleton = () => {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="relative overflow-hidden rounded bg-neutral-700">
        <div className="aspect-4/5 animate-pulse bg-neutral-700" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-5 w-4/5 animate-pulse rounded bg-neutral-700" />
        <div className="h-4 w-full animate-pulse rounded bg-neutral-700" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-700" />
      </div>

      <div className="mt-auto h-4 w-1/3 animate-pulse rounded bg-neutral-700" />
    </div>
  );
};

const CategoryCardSkeleton = () => {
  return (
    <div className="relative h-full min-h-80 overflow-hidden rounded bg-neutral-700">
      <div className="absolute inset-0 animate-pulse bg-neutral-700" />
      <div className="absolute bottom-3 left-3 h-7 w-1/2 animate-pulse rounded bg-neutral-600" />
    </div>
  );
};
