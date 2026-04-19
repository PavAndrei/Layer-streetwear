import { HeaderUserBlock } from './header-user-block';
import { LogoBlock } from './logo-block';
import { HeaderDropdown } from './header-dropdown/header-dropdown';

export const Header = () => {
  return (
    <header className="bg-neutral-900 z-50 relative">
      <div className="max-w-365 mx-auto my-0 px-2.5">
        <div className="flex py-4 items-center gap-5">
          <div className="flex grow">
            <LogoBlock />
            <HeaderDropdown />
          </div>
          <HeaderUserBlock />
        </div>
      </div>
    </header>
  );
};
