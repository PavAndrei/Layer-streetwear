import Image from 'next/image';
import avatar from '@/public/avatar-1.jpg';
import { ArrowDownIcon } from '@/app/icons/arrow-down-icon';

export const HeaderUserProfile = () => {
  return (
    <div className="flex gap-2 cursor-pointer hover:opacity-70 transition-opacity duration-200 ease-in">
      <Image
        src={avatar}
        width={30}
        height={30}
        alt="avatar"
        className="rounded-full border border-neutral-50"
      />
      <div className="hidden lg:flex gap-1">
        <p>User</p>
        <button className="-translate-y-0.5">
          <ArrowDownIcon />
        </button>
      </div>
    </div>
  );
};
