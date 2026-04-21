'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { SearchProduct } from '@/app/types/product';
import { useEffect, useRef, useState } from 'react';
import { HeaderSearchInput } from './header-search-input';
import { HeaderSearchOutput } from './header-search-output';
import { HeaderSearchError } from './header-search-error';

export const HeaderSearch = ({
  onFocusFunction,
  onBlurFunction,
}: {
  onFocusFunction: () => void;
  onBlurFunction: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [receivedData, setReceivedData] = useState<
    {
      category: string;
      products: SearchProduct[];
    }[]
  >([]);

  const searchRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (pathname !== '/search') return;

    const timeout = setTimeout(() => {
      const currentUrlQuery = searchParams.get('query') || '';

      if (currentUrlQuery === query) return;

      router.replace(`/search?query=${encodeURIComponent(query)}`, {
        scroll: false,
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, pathname, router, searchParams]);

  useEffect(() => {
    const fetchSearchData = async () => {
      if (query.length > 1) {
        try {
          setIsLoading(true);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?query=${query}`,
          );
          const data = await res.json();
          setReceivedData(data);
        } catch (error) {
          console.error('Error fetching search data:', error);
          setErrorMessage('Error fetching search data');
        } finally {
          setIsLoading(false);
        }
      } else {
        setReceivedData([]);
      }
    };

    const debounce = setTimeout(fetchSearchData, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const resetSearch = () => {
    setIsOpen(false);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      resetSearch();
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <HeaderSearchInput
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        handleInputFocus={() => {
          handleInputFocus();
          onFocusFunction();
        }}
        handleInputBlur={onBlurFunction}
        inputRef={inputRef}
      />
      {isOpen && query.length > 1 && (
        <div className="absolute flex flex-col gap-2 top-10 left-0 w-full bg-neutral-800 p-2 rounded outline outline-lime-600 shadow-[0_0_15px_rgba(132,204,22,0.6)] max-h-75 overflow-auto">
          {errorMessage && (
            <HeaderSearchError
              errorMessage={errorMessage}
              inputRef={inputRef}
              setErrorMessage={setErrorMessage}
              setQuery={setQuery}
            />
          )}
          <HeaderSearchOutput
            data={receivedData}
            isLoading={isLoading}
            errorMessage={errorMessage}
            query={query}
            resetSearch={resetSearch}
          />
        </div>
      )}
    </div>
  );
};
