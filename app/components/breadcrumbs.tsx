'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRightIcon } from '../icons/arrow-right-icon';

export const Breadcrumbs = () => {
  const pathname = usePathname();

  if (pathname === '/') return null;

  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, i) => {
    const path = `/${pathSegments.slice(0, i + 1).join('/')}`;

    return {
      label: segment,
      path,
      isLast: i === pathSegments.length - 1,
    };
  });

  breadcrumbs.unshift({ label: 'Home', path: '/', isLast: false });

  return (
    <nav className="mt-10 flex flex-col gap-10 max-w-365 px-2.5 mx-auto w-full">
      <ul className="flex items-center gap-4">
        {breadcrumbs.map((breadcrumb, i) => (
          <li key={i} className="flex items-center gap-2">
            <div
              className={`${breadcrumb.isLast ? 'opacity-50' : 'hover:border-current transition-colors'} capitalize pb-0.5 border-b border-transparent`}
            >
              {breadcrumb.isLast ? (
                breadcrumb.label
              ) : (
                <Link href={breadcrumb.path}>{breadcrumb.label}</Link>
              )}
            </div>
            {!breadcrumb.isLast && <ArrowRightIcon h={18} w={18} />}
          </li>
        ))}
      </ul>
    </nav>
  );
};
