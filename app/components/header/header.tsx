import { HeaderUserBlock } from './header-user-block';
import { LogoBlock } from './logo-block';
import { SearchBlock } from './search-block';

export const Header = () => {
  return (
    <header className="bg-neutral-900 z-50">
      <div className="max-w-365 mx-auto my-0 px-2.5">
        <div className="flex py-4 items-center gap-5">
          <div className="flex grow">
            <LogoBlock />
            <SearchBlock />
          </div>
          <HeaderUserBlock />
        </div>
      </div>
    </header>
  );
};
