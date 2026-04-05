import Link from 'next/link';
import { ArrowRightIcon } from '../icons/arrow-right-icon';

export const NavigateLink = ({
  href,
  text,
}: {
  href: string;
  text: string;
}) => {
  return (
    <Link href={href}>
      <div className="flex items-center gap-5">
        <span>{text}</span>
        <ArrowRightIcon />
      </div>
    </Link>
  );
};
