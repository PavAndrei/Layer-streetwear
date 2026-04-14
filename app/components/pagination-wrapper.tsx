'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PAGINATION } from '../(products)/constants';
import { debounce } from '../utils/debounce';
import { Pagination } from '../(products)/pagination';
import { getItemsByScreenSize } from '../utils/get-items-by-screen-size';

export const PaginationWrapper = ({
  total,
  currentPage,
  basePath,
}: {
  total: number;
  currentPage: number;
  basePath: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [limit, setLimit] = useState(
    Number(searchParams.get('limit')) || PAGINATION.PRODUCTS_LIMIT,
  );

  const isFirstRender = useRef(true);

  useEffect(() => {
    const updateLimit = () => {
      const newLimit = getItemsByScreenSize();

      if (newLimit === limit) return;

      setLimit(newLimit);

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('limit', newLimit.toString());

      if (!isFirstRender.current) {
        newSearchParams.set('page', '1');
      }

      router.replace(`${basePath}?${newSearchParams.toString()}`, {
        scroll: false,
      });
    };

    updateLimit();

    isFirstRender.current = false;

    const handleResize = debounce(updateLimit, 200);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [limit, searchParams, basePath, router]);

  return (
    <Pagination
      total={total}
      limit={limit}
      currentPage={currentPage}
      basePath={basePath}
      searchQueryString={searchParams.toString()}
    />
  );
};
