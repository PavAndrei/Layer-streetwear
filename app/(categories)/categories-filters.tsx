'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type FilterKey = 'inStock' | 'hasDiscount' | 'isNew' | 'trending';

const stateFilters: { key: FilterKey; label: string }[] = [
  { key: 'inStock', label: 'In Stock' },
  { key: 'hasDiscount', label: 'On Sale' },
  { key: 'isNew', label: 'New' },
  { key: 'trending', label: 'Trending' },
];

const styleFilters = [
  { key: 'oversized', label: 'Oversized' },
  { key: 'minimal', label: 'Minimal' },
  { key: 'graphic', label: 'Graphic' },
];

export const CategoriesFilters = ({ basePath }: { basePath: string }) => {
  const searchParams = useSearchParams();

  const buildFiltersQuery = (key: FilterKey) => {
    const params = new URLSearchParams(searchParams.toString());
    const isActive = params.get(key) === 'true';

    if (isActive) {
      params.delete(key);
    } else {
      params.set(key, 'true');
    }

    params.delete('page');

    const queryString = params.toString();

    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  const isFilterActive = (key: FilterKey) => searchParams.get(key) === 'true';

  return (
    <section className="mx-auto max-w-365 px-2.5">
      <div className="flex flex-col justify-center pt-10 gap-4">
        <div className="flex flex-wrap gap-4">
          {stateFilters.map(({ key, label }) => (
            <Link
              key={key}
              href={buildFiltersQuery(key)}
              className={`px-3 py-1 rounded text-neutral-50 transition cursor-pointer active:scale-95 ${
                isFilterActive(key)
                  ? 'bg-lime-600 hover:bg-lime-500 scale-105'
                  : 'bg-neutral-800 hover:bg-neutral-700'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
        <p className="text-sm text-neutral-400">Style</p>
        <div className="flex flex-wrap gap-4">
          {styleFilters.map(({ key, label }) => (
            <Link
              key={key}
              href="#"
              className="px-3 py-1 rounded text-neutral-50 transition cursor-pointer active:scale-95 bg-neutral-800 hover:bg-neutral-700"
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          className="max-w-27.5 px-3 py-1 rounded text-neutral-50 transition cursor-pointer active:scale-95 bg-neutral-800 hover:bg-neutral-700"
          href={basePath}
        >
          Clear filters
        </Link>
      </div>
    </section>
  );
};
