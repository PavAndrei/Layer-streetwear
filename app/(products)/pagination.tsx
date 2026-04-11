'use client';

import Link from 'next/link';

const getPageUrl = (
  page: number,
  params: URLSearchParams,
  basePath: string,
) => {
  const newParams = new URLSearchParams(params);
  newParams.set('page', page.toString());

  return `${basePath}?${newParams.toString()}`;
};

const getVisiblePages = (totalPages: number, currentPage: number) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) {
    end = 5;
  } else if (currentPage >= totalPages - 2) {
    start = totalPages - 4;
  }

  const pages: (number | string)[] = [];

  if (start > 1) pages.push(1);

  if (start > 2) pages.push('...');

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) pages.push('...');

  if (end < totalPages) pages.push(totalPages);

  return pages;
};

export const Pagination = ({
  total,
  limit,
  currentPage,
  basePath,
  searchQueryString,
}: {
  total: number;
  limit: number;
  currentPage: number;
  basePath: string;
  searchQueryString: string;
}) => {
  const totalPages = Math.ceil(total / limit);
  const params = new URLSearchParams(searchQueryString);
  const visiblePages = getVisiblePages(totalPages, currentPage);

  return (
    <div className="mx-auto w-full flex items-center gap-2 justify-center pt-4">
      <Link
        className={`border rounded py-1.5 md:px-2 px-1.5 text-sm md:text-lg active:scale-90 hover:bg-neutral-800 disabled:bg-neutral-500 transition duration-100 ease-in ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}`}
        aria-disabled={currentPage <= 1}
        href={getPageUrl(currentPage - 1, params, basePath)}
        tabIndex={currentPage <= 1 ? -1 : 0}
      >
        {'<'}
      </Link>

      {visiblePages.map((page, index) =>
        typeof page === 'number' ? (
          <Link
            key={index}
            href={getPageUrl(page, params, basePath)}
            className={`border rounded py-1.5 md:px-2 px-1.5 text-sm md:text-lg active:scale-90 hover:bg-neutral-800 transition duration-100 ease-in ${
              currentPage === page ? 'bg-neutral-800' : ''
            }`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </Link>
        ) : (
          <span key={index} className="text-sm md:text-lg">
            {page}
          </span>
        ),
      )}

      <Link
        className={`border rounded py-1.5 md:px-2 px-1.5 text-sm md:text-lg active:scale-90 hover:bg-neutral-800 disabled:bg-neutral-500 transition duration-100 ease-in ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
        aria-disabled={currentPage >= totalPages}
        href={getPageUrl(currentPage + 1, params, basePath)}
        tabIndex={currentPage >= totalPages ? -1 : 0}
      >
        {'>'}
      </Link>
    </div>
  );
};
