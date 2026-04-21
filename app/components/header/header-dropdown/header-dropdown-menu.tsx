import Link from 'next/link';
import { HeaderCategoriesBtn } from '../header-categories-btn';
import { HeaderSearch } from '../header-search/header-search';
import { ErrorBlock } from '../../error-block';
import { CategoryCardProps } from '@/app/types/categories';
import { Suspense } from 'react';

export const HeaderDropdownMenu = ({
  searchBlockRef,
  isInputFocused,
  isOpen,
  setIsOpen,
  setIsInputFocused,
  categoriesMenuRef,
  categories,
  isLoading,
  error,
}: {
  isLoading: boolean;
  isInputFocused: boolean;
  isOpen: boolean;
  setIsInputFocused: (isInputFocused: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  searchBlockRef: React.RefObject<HTMLDivElement | null>;
  categoriesMenuRef: React.RefObject<HTMLDivElement | null>;
  categories: CategoryCardProps[];
  error: { error: Error; errorMessage?: string; title?: string } | null;
}) => {
  return (
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
      <Suspense fallback={null}>
        <HeaderSearch
          onFocusFunction={() => {
            setIsOpen(false);
            setIsInputFocused(true);
          }}
          onBlurFunction={() => setIsInputFocused(false)}
        />
      </Suspense>
      {isOpen && (
        <div
          className="hidden md:block absolute top-22 left-0 right-0"
          ref={categoriesMenuRef}
        >
          <div className="max-w-365 mx-auto my-0 px-0.5">
            {error ? (
              <ErrorBlock
                error={error.error}
                errorMessage={error.errorMessage}
                title={error.title}
              />
            ) : (
              <ul className="w-full grid grid-cols-3 xl:grid-cols-4 gap-6 bg-neutral-800 p-4 rounded outline outline-lime-600 shadow-[0_0_15px_rgba(132,204,22,0.6)] max-h-120 overflow-auto font-semibold">
                {isLoading && <li>Loading...</li>}
                {categories?.map((category) => (
                  <li key={category._id}>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="text-neutral-50 hover:text-lime-600 transition-colors duration-100 ease-in"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
