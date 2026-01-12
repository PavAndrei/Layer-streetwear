import { BurgerMenuIcon } from '@/app/icons/burger-menu-icon';
import { CartIcon } from '@/app/icons/cart-icon';
import { HeartIcon } from '@/app/icons/heart-icon';
import { ParcelIcon } from '@/app/icons/parcel-icon';
import { HeaderUserProfile } from './header-user-profile';

export const HeaderUserMenu = () => {
  return (
    <ul className="flex md:gap-4 bg-neutral-900 justify-between md:static fixed bottom-0 left-0 right-0 p-4">
      <li className="flex md:hidden items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-200 ease-in">
        <BurgerMenuIcon w={24} h={24} />
      </li>
      <li className="flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity duration-200 ease-in">
        <HeartIcon w={24} h={24} />
      </li>
      <li className="flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity duration-200 ease-in">
        <ParcelIcon w={24} h={24} />
      </li>
      <li className="flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity duration-200 ease-in">
        <CartIcon w={24} h={24} />
      </li>
      <li>
        <HeaderUserProfile />
      </li>
    </ul>
  );
};
