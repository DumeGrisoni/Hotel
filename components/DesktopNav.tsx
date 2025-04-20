'use client';

import React from 'react';
import { redirect, usePathname } from 'next/navigation';
import Link from 'next/link';

const DesktopNav = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  // --------------------- Hooks -----------------------------

  const pathname = usePathname();

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

  // --------------------- Render -----------------------------

  return (
    <nav>
      {/* redirect to homepage if not isAuthenticated and on dashboard */}
      <ul className="flex flex-col lg:flex-row gap-6">
        {links.map((link, index) => {
          return (
            <li key={index}>
              <Link
                href={link.path}
                className="font-bold text-[13px] transition-all tracking-[3px] uppercase hover:text-accent-hover"
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
      {!isAuthenticated && pathname === '/dashboard' && redirect('/')}
    </nav>
  );
};

export default DesktopNav;
