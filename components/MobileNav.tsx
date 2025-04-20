import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import Image from 'next/image';

// --------------------- Variables -----------------------------

const links: { name: string; path: string }[] = [
  {
    name: 'Accueil',
    path: '/',
  },
  {
    name: 'Chambres',
    path: '/room',
  },
  {
    name: 'Restaurant',
    path: '/restaurant',
  },
  {
    name: 'Spa',
    path: '/spa',
  },
  {
    name: 'A propos',
    path: '/contact',
  },
];

const MobileNav = () => {
  // --------------------- Return -----------------------------

  return (
    <Sheet>
      <SheetTrigger className="text-2xl text-primary flex items-center">
        <FaBars />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex justify-center items-center bg-white"
      >
        <SheetTitle className="font-primary flex flex-col items-center gap-3 text-primary text-3xl ">
          <div className="relative z-0 w-[82px] h-[20px]">
            <Image
              src={'/assets/heading-icon.svg'}
              fill
              alt="icon-logo"
              className="object-cover absolute"
              priority
            />
          </div>
          Menu
        </SheetTitle>
        <div className="h-px bg-gray-300 w-[70%] mx-auto my-2" />
        <nav className="flex flex-col gap-8 text-center">
          {links.map((link, index) => (
            <SheetClose asChild key={index}>
              <Link
                href={link.path}
                className="text-2xl font-primary text-primary hover:text-accent-hover transition-all"
              >
                {link.name}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
