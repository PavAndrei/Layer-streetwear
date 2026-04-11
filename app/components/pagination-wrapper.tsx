'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PAGINATION } from '../(products)/constants';
import { useRouter } from 'next/navigation';
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
  const [limit, setLimit] = useState(PAGINATION.PRODUCTS_LIMIT);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const updateLimit = () => {
      const newLimit = getItemsByScreenSize();

      if (newLimit === limit) return;

      setLimit(newLimit);

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('limit', newLimit.toString());
      newSearchParams.set('page', '1');

      router.replace(`${basePath}?${newSearchParams.toString()}`, {
        scroll: false,
      });
    };

    updateLimit();

    const handleResize = debounce(updateLimit, 200);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [limit, searchParams, basePath, router]);

  return (
    <>
      <Pagination
        total={total}
        limit={limit}
        currentPage={currentPage}
        basePath={basePath}
        searchQueryString={searchParams.toString()}
      />
    </>
  );
};
