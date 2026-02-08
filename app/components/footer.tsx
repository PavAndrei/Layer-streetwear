import Link from 'next/link';
import { LogoIcon } from '../icons/logo-icon';
import { InstIcon } from '../icons/inst-icon';
import { FBIcon } from '../icons/fb-icon';
import { TwitterIcon } from '../icons/twitter-icon';
import { LinkedinIcon } from '../icons/linkedin-icon';
import { PhoneIcon } from '../icons/phone-icon';

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-10 max-w-365 px-2.5 mx-auto w-full pb-20 md:pb-5">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
        <div>
          <Link href="/">
            <LogoIcon className="h-12 w-auto md:h-14 lg:h-18 text-neutral-50" />
          </Link>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between xl:gap-15">
          <ul className="flex flex-col gap-1 text-lg [@media(min-width:480px)]:flex-row [@media(min-width:480px)]:gap-5">
            <li>
              <Link
                href="/about"
                className="border-b border-transparent hover:border-current transition-colors"
              >
                About
              </Link>
            </li>
            <li className="border-b border-transparent hover:border-current transition-colors">
              <Link href="/contacts">Contacts</Link>
            </li>
            <li className="border-b border-transparent hover:border-current transition-colors">
              <Link href="/jobs">Find work</Link>
            </li>
            <li className="border-b border-transparent hover:border-current transition-colors">
              <Link href="/articles">Articles</Link>
            </li>
            <li className="border-b border-transparent hover:border-current transition-colors">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
          <div className="flex gap-2 items-center">
            <PhoneIcon />
            <span>+1 123 234 45 56</span>
          </div>
        </div>

        <ul className="flex gap-10">
          <li className="flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity duration-200 ease-in">
            <Link href="https://www.instagram.com/" target="_blank">
              <InstIcon />
            </Link>
          </li>
          <li className="flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity duration-200 ease-in">
            <Link href="https://www.facebook.com/" target="_blank">
              <FBIcon />
            </Link>
          </li>
          <li className="flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity duration-200 ease-in">
            <Link href="https://www.twitter.com/" target="_blank">
              <TwitterIcon />
            </Link>
          </li>
          <li className="flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity duration-200 ease-in">
            <Link href="https://www.linkedin.com/" target="_blank">
              <LinkedinIcon />
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col md:flex-row gap-1 text-sm text-neutral-300">
        <span>© 2024 LAYER. All rights reserved.</span>
        <span>Designed by LAYER Team</span>
      </div>
    </footer>
  );
};
