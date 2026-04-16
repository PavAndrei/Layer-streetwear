'use client';

import { MouseEvent, useEffect, useRef, useState } from 'react';
import { HeaderUserBlock } from './header-user-block';
import { LogoBlock } from './logo-block';
import { SearchBlock } from './search-block';
import Link from 'next/link';
import { CategoryCardProps } from '@/app/types/categories';
import { HeaderCategoriesBtn } from './header-categories-btn';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryCardProps[]>([]);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const searchBlockRef = useRef<HTMLDivElement>(null);
  const categoriesMenuRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (
      searchBlockRef.current &&
      !searchBlockRef.current.contains(e.target as Node) &&
      categoriesMenuRef.current &&
      !categoriesMenuRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      if (categories.length > 0) return;

      try {
        const res = await fetch(`/api/categories`);
        const data = await res.json();

        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [isOpen]);

  return (
    <header
      className="bg-neutral-900 z-50 relative"
      onMouseLeave={() => setIsOpen(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-365 mx-auto my-0 px-2.5">
        <div className="flex py-4 items-center gap-5">
          <div className="flex grow">
            <LogoBlock />
            <div
              className="flex items-center gap-5 w-full md:min-w-100 lg:min-w-140 text-neutral-50"
              ref={searchBlockRef}
            >
              <div
                onMouseEnter={() => {
                  if (!isInputFocused) {
                    setIsOpen(true);
                  }
                }}
              >
                <HeaderCategoriesBtn />
              </div>
              <SearchBlock
                onFocusFunction={() => {
                  setIsOpen(false);
                  setIsInputFocused(true);
                }}
                onBlurFunction={() => setIsInputFocused(false)}
              />
            </div>
          </div>
          <HeaderUserBlock />
        </div>
      </div>
      {isOpen && (
        <div
          className="hidden md:block absolute top-22 left-0 right-0"
          ref={categoriesMenuRef}
        >
          <div className="max-w-365 mx-auto my-0 px-0.5">
            <ul className="w-full grid grid-cols-2 xl:grid-cols-4 gap-6 bg-neutral-800 p-4 rounded outline outline-lime-600 shadow-[0_0_15px_rgba(132,204,22,0.6)] max-h-75 overflow-auto font-semibold">
              {isLoading && <li>Loading...</li>}
              {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/categories/${category._id}`}
                    className="text-neutral-50 hover:text-lime-600 transition-colors duration-100 ease-in"
                    onClick={() => setIsOpen(false)}
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};
