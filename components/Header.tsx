'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaYoutube, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

// -------------------- Import Internes --------------------

import { Button } from '@/components/ui/button';
import DropDown from './DropDown';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import { useAuth } from '@/app/context/authContext';

const Header = () => {
  // -------------------- Hooks --------------------

  const { isUserAuthenticated, user } = useAuth();

  // -------------------- Variables --------------------

  const socials = [
    { icons: <FaYoutube />, href: '#' },
    { icons: <FaInstagram />, href: '#' },
    { icons: <FaTwitter />, href: '#' },
    { icons: <FaFacebook />, href: '#' },
  ];

  // -------------------- Functions --------------------

  // -------------------- Return --------------------
  return (
    <header className="py-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-6">
          {/* logo et social */}
          <div className="flex items-center gap-5 justify-center xl:w-max">
            <Link href="/">
              <Image
                src="/assets/logo.svg"
                alt="logo"
                width={60}
                height={40}
                priority
                style={{
                  height: 'auto',
                  width: '160px',
                }}
              />
            </Link>
            <div className="w-[1px] h-[40px] bg-gray-300 " />
            <div className="flex gap-2">
              {socials.map((items, index) => {
                return (
                  <Link
                    href={items.href}
                    key={index}
                    className="bg-accent text-white hover:bg-accent-hover text-sm w-[28px] h-[28px] flex items-center justify-center rounded-full transition-all"
                  >
                    {items.icons}
                  </Link>
                );
              })}
            </div>
          </div>
          {/* signIn & Up */}
          <div className="px-6 flex items-center justify-center gap-8 xl:w-max">
            <div className="flex items-center gap-2 xl:order-2">
              {isUserAuthenticated ? (
                <DropDown user={user} />
              ) : (
                <div className="flex gap-2">
                  <Link href="/login">
                    <Button variant={'outline'} className="hover:text-white">
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant={'outline'} className="hover:text-white">
                      Inscription
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            {/* mobile Navbar */}
            <div className="xl:hidden">
              <MobileNav />
            </div>
            {/* desktop nav  */}
            <div className="hidden xl:flex">
              <DesktopNav isAuthenticated={isUserAuthenticated} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
