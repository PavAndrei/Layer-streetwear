import Link from 'next/link';
import { LogoIcon } from '@/app/icons/logo-icon';

export const LogoBlock = () => {
  return (
    <Link href="/">
      <LogoIcon className="h-12 w-auto md:h-14 lg:h-18 text-neutral-50" />
    </Link>
  );
};
