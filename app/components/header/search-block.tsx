'use client';

import { useRouter } from 'next/navigation';
import { BurgerMenuIcon } from '@/app/icons/burger-menu-icon';
import { SearchIcon } from '@/app/icons/search-icon';
import { SearchProduct } from '@/app/types/product';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { HighlightMatches } from './highlight-matches';

export const SearchBlock = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [receivedData, setReceivedData] = useState<
    {
      category: string;
      products: SearchProduct[];
    }[]
  >([]);

  const searchRef = useRef<HTMLDivElement>(null);

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
    const fetchSearchData = async () => {
      if (query.length > 1) {
        try {
          setIsLoading(true);
          const res = await fetch(`api/search?query=${query}`);
          const data = await res.json();
          console.log(data);
          setReceivedData(data);
        } catch (error) {
          console.error('Error fetching search data:', error);
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
    setQuery('');
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      resetSearch();
    }
  };

  return (
    <div className="flex items-center gap-5 w-full md:min-w-100 lg:min-w-140 text-neutral-50">
      <Link
        href="/categories"
        className="hidden md:flex items-center gap-1 bg-lime-600 rounded px-2 py-1 hover:bg-lime-500 cursor-pointer transition-colors duration-200 ease-in text-neutral-50"
      >
        <BurgerMenuIcon w={25} h={25} />
        <span className="text-md">Search</span>
      </Link>
      <div className="relative w-full" ref={searchRef}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            className="placeholder:text-neutral-500 focus:shadow-[0_0_15px_rgba(132,204,22,0.6)] outline outline-lime-600 px-2 py-1 rounded group transition-shadow duration-200 ease-in w-full max-w-full"
            onFocus={handleInputFocus}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            name="search"
          />
          <button className="cursor-pointer" type="submit">
            <SearchIcon className="absolute top-1.5 right-2 w-5 h-5 stroke-neutral-500" />
          </button>
        </form>
        {isOpen && query.length > 1 && (
          <div className="absolute flex flex-col gap-2 top-10 left-0 w-full bg-neutral-800 p-2 rounded outline outline-lime-600 shadow-[0_0_15px_rgba(132,204,22,0.6)] max-h-75 overflow-auto">
            {isLoading ? (
              <div className="text-sm">Loading...</div>
            ) : (
              <>
                {receivedData.length > 0 &&
                  receivedData.map(({ category, products }, i) => (
                    <div key={i}>
                      <Link
                        href={`/categories/${encodeURIComponent(category)}`}
                        className="flex gap-1 items-center justify-between cursor-pointer group"
                        onClick={() => resetSearch()}
                      >
                        <span className="text-neutral-500 group-hover:text-neutral-50 transition-colors duration-100 ease-in capitalize">
                          <HighlightMatches text={category} highlight={query} />
                        </span>
                        <BurgerMenuIcon
                          w={20}
                          h={20}
                          className="text-neutral-500 group-hover:text-neutral-50 transition-colors duration-100 ease-in"
                        />
                      </Link>
                      <ul className="flex flex-col">
                        {products.map((product) => (
                          <li
                            key={product._id}
                            className="border-t border-neutral-500 py-1 cursor-pointer group"
                          >
                            <Link
                              href={`/product/${product._id}`}
                              className="wrap-break-word text-neutral-500 group-hover:text-neutral-50 transition-colors duration-100 ease-in"
                              onClick={() => resetSearch()}
                            >
                              <HighlightMatches
                                text={product.title}
                                highlight={query}
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                {receivedData.length === 0 && (
                  <div className="text-neutral-500">No results found.</div>
                )}
                {}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
