'use client';
import React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// ------------------ Import Internes ----------------

import { Booking } from '@/types/bookingType';
import { Room } from '@/types/roomsTypes';
import { Button } from '../ui/button';
import { deleteRoom } from '@/app/actions/roomCrud';
import { deleteBooking } from '@/app/actions/bookingCrud';
import { Menu } from '@/types/menuType';

const AdminButton = ({
  disabled,
  id,
  data,
  type,
  onUpdate,
}: {
  disabled?: boolean;
  id: string;
  data: Room | Booking | Menu;
  type: 'delete' | 'update';
  onUpdate?: () => void;
}) => {
  const router = useRouter();
  const handleDelete = async () => {
    if ('title' in data && 'size' in data) {
      const confirmed = window.confirm(
        'Etes-vous sur de vouloir supprimer la chambre?'
      );
      if (confirmed) {
        await deleteRoom(id as string);
        toast.success('Chambre supprimée');
        router.push('/profil/admin');
      } else {
        return toast.error('Suppression annulée');
      }
    } else if ('name' in data && 'checkIn' in data) {
      console.log('booking id', id);
      const confirmed = window.confirm(
        'Etes-vous sur de vouloir supprimer la reservation?'
      );
      if (confirmed) {
        console.log('delete booking');
        await deleteBooking(id as string);
        toast.success('Reservation supprimée');
        router.push('/profil/admin');
      } else {
        return toast.error('Suppression annulée');
      }
    } else if ('title' in data && 'descriptions' in data && 'dishes' in data) {
      const confirmed = window.confirm(
        'Etes-vous sur de vouloir supprimer le menu?'
      );
      if (confirmed) {
        console.log('delete menu');
        toast.success('Menu supprimée');
        router.push('/profil/admin');
      } else {
        return toast.error('Suppression annulée');
      }
    }
  };

  const handleUpdate = async () => {
    if ('title' in data && 'size' in data) {
      const confirmed = window.confirm(
        'Etes-vous sur de vouloir modifier la chambre?'
      );
      if (confirmed) {
        console.log('update room');
        onUpdate?.();
        toast.success('Chambre modifiée');
        router.push('/profil/admin');
      } else {
        return toast.error('Modification annulée');
      }
    } else if ('name' in data && 'checkIn' in data) {
      const confirmed = window.confirm(
        'Etes-vous sur de vouloir modifier la reservation?'
      );
      if (confirmed) {
        onUpdate?.();
        console.log('update booking');
        toast.success('Reservation modifiée');
        router.push('/profil/admin');
      } else {
        return toast.error('Modification annulée');
      }
    } else if ('title' in data && 'descriptions' in data && 'dishes' in data) {
      const confirmed = window.confirm(
        'Etes-vous sur de vouloir modifier le menu?'
      );
      if (confirmed) {
        onUpdate?.();
        console.log('update menu');
        toast.success('Menu modifiée');
        router.push('/profil/admin');
      } else {
        return toast.error('Modification annulée');
      }
    }
  };
  return (
    <Button
      disabled={disabled}
      type="submit"
      className={`${
        type === 'delete'
          ? ' bg-accent hover:bg-accent-hover text-white'
          : ' hover:text-white'
      } w-full md:w-[25%] cursor-pointer py-4.5`}
      onClick={type === 'delete' ? handleDelete : handleUpdate}
    >
      {type === 'delete' ? 'Supprimer' : 'Modifier'}
    </Button>
  );
};

export default AdminButton;
