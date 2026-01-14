import { BurgerMenuIcon } from '@/app/icons/burger-menu-icon';
import { SearchIcon } from '@/app/icons/search-icon';

export const SearchBlock = () => {
  return (
    <div className="flex items-center gap-5 w-full md:min-w-100 lg:min-w-140 text-neutral-50">
      <button className="hidden md:flex items-center gap-1 bg-lime-600 rounded px-2 py-1 hover:bg-lime-500 cursor-pointer transition-colors duration-200 ease-in text-neutral-50">
        <BurgerMenuIcon w={25} h={25} />
        <span className="text-md">Search</span>
      </button>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search..."
          className="placeholder:text-neutral-500 focus:shadow-md shadow-lime-700 outline outline-lime-600 px-2 py-1 rounded group transition-shadow duration-200 ease-in w-full max-w-full"
        />
        <button className="cursor-pointer">
          <SearchIcon className="absolute top-1.5 right-2 w-5 h-5 stroke-neutral-500" />
        </button>
      </div>
    </div>
  );
};
