import { HeaderUserMenu } from './header-user-menu';

export const HeaderUserBlock = () => {
  return (
    <nav aria-label="User navigation" className="md:static fixed bottom-0">
      <HeaderUserMenu />
    </nav>
  );
};
