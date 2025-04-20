'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { FaCalendarCheck, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { DropdownMenuShortcut } from '@/components/ui/dropdown-menu';
import { toast } from 'react-toastify';

// -------------------- Import Internes -------------------

import destroySession from '@/app/actions/destroySession';
import { useAuth } from '@/app/context/authContext';
import { User } from '@/types/userType';

const DropDown = ({ user }: { user: User | null }) => {
  // -------------------- Hooks -------------------
  const router = useRouter();
  const { setIsUserAuthenticated } = useAuth();

  // -------------------- Functions -------------------

  const handleLogout = async () => {
    const { error, success } = await destroySession();

    if (error) {
      console.log(error);
      toast.error(error, {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else if (success) {
      setIsUserAuthenticated(false);
      router.push('/login');
    }
  };

  // -------------------------- Return ----------------------------

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 items-center justify-center cursor-pointer">
          {/* avatar */}
          <Avatar>
            <AvatarFallback className="bg-accent text-white">
              {`${user.name?.split(' ')[0].charAt(0)} ${user.name
                ?.split(' ')[1]
                .charAt(0)}`}
            </AvatarFallback>
          </Avatar>

          {/* nom et email */}
          <div>
            <div className="flex gap-1 font-bold">
              <p>{user.name}</p>
            </div>
            <p className="text-sm font-semi-bold">{user.email}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" z-40 w-72 mt-4 overflow-x-hidden p-4 flex-col flex gap-2 bg-white border border-gray-100 rounded-xl drop-shadow-xl"
        align="start"
      >
        <DropdownMenuLabel className="text-base font-bold cursor-default">
          Mon Compte
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="separator" />
        <DropdownMenuGroup className="flex flex-col gap-2">
          <Link href="/">
            <DropdownMenuItem className="itemMenu">
              Accueil
              <DropdownMenuShortcut>
                <FaHome className="text-lg text-accent" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>

          <Link href="/profil">
            <DropdownMenuItem className="itemMenu">
              {user.labels && user.labels.includes('admin')
                ? 'Tableau de bord'
                : 'Mes réservations'}
              <DropdownMenuShortcut>
                <FaCalendarCheck className="text-lg text-accent" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="separator" />

        <button
          onClick={handleLogout}
          className="flex w-full  items-center justify-between"
        >
          <DropdownMenuItem className="itemMenu w-full">
            Déconnexion
            <DropdownMenuShortcut className="text-lg text-accent">
              <FaSignOutAlt />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
