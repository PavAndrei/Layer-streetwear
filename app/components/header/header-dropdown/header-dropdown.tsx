'use client';

import { CategoryCardProps } from '@/app/types/categories';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HeaderDropdownMenu } from './header-dropdown-menu';

export const HeaderDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{
    error: Error;
    errorMessage?: string;
    title?: string;
  } | null>(null);

  const [categories, setCategories] = useState<CategoryCardProps[]>([]);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const searchBlockRef = useRef<HTMLDivElement | null>(null);
  const categoriesMenuRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (
        searchBlockRef.current &&
        !searchBlockRef.current.contains(e.target as Node) &&
        categoriesMenuRef.current &&
        !categoriesMenuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [searchBlockRef, categoriesMenuRef],
  );

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (categories.length > 0) return;

      try {
        const res = await fetch(`/api/categories`);
        const data = await res.json();

        setCategories(data);
      } catch (error) {
        setError({
          error:
            error instanceof Error ? error : new Error(String('Unknown error')),
          errorMessage: 'Failed to fetch categories',
          title: 'No available categories. Try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [isOpen]);

  return (
    <HeaderDropdownMenu
      categories={categories}
      categoriesMenuRef={categoriesMenuRef}
      error={error}
      isLoading={isLoading}
      isOpen={isOpen}
      isInputFocused={isInputFocused}
      setIsInputFocused={setIsInputFocused}
      setIsOpen={setIsOpen}
      searchBlockRef={searchBlockRef}
    />
  );
};
