import { SearchIcon } from '@/app/icons/search-icon';
import { RefObject } from 'react';

export const HeaderSearchInput = ({
  query,
  setQuery,
  handleSearch,
  handleInputFocus,
  handleInputBlur,
  inputRef,
}: {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
}) => {
  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        className="placeholder:text-neutral-500 focus:shadow-[0_0_15px_rgba(132,204,22,0.6)] outline outline-lime-600 px-2 py-1 rounded group transition-shadow duration-200 ease-in w-full max-w-full"
        onFocus={() => {
          handleInputFocus();
        }}
        onBlur={handleInputBlur}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        name="search"
        ref={inputRef}
        autoComplete="off"
      />
      <button className="cursor-pointer" type="submit">
        <SearchIcon className="absolute top-1.5 right-2 w-5 h-5 stroke-neutral-500" />
      </button>
    </form>
  );
};
