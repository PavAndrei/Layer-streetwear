import { BurgerMenuIcon } from '@/app/icons/burger-menu-icon';
import Link from 'next/link';

export const HeaderCategoriesBtn = () => {
  return (
    <Link
      href="/categories"
      className="hidden md:flex items-center gap-1 bg-lime-600 rounded px-2 py-1 hover:bg-lime-500 cursor-pointer transition-colors duration-200 ease-in text-neutral-50"
    >
      <BurgerMenuIcon w={25} h={25} />
      <span className="text-md">Categories</span>
    </Link>
  );
};
