'use client';
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

// --------------- Import Internes ------------------------------
import { getAllRooms } from '@/app/actions/roomCrud';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Room } from '@/types/roomsTypes';
import { Button } from '../ui/button';
import { getImageUrl } from '@/lib/imageUrl';

const AdminRooms = () => {
  // --------------- Hooks ------------------------------
  const [rooms, setRooms] = useState([] as Room[]);

  // --------------- useEffect ------------------------------

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await getAllRooms();
      setRooms(rooms);
    };
    fetchRooms();
  }, []);

  // --------------- Functions ------------------------------

  const handleUpdate = (id: string) => {
    redirect(`/profil/admin/room/${id}`);
  };

  const handleAddRoom = () => {
    redirect(`/profil/admin/room/add`);
  };

  // --------------- Render ------------------------------

  return (
    <section className="md:w-[80%] lg:w-[70%] xl:w-[50%] w-[95%] mx-auto flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        <Table className="w-full">
          <TableHeader className="bg-accent  text-white">
            <TableRow>
              <TableHead className="text-center font-semibold">Image</TableHead>
              <TableHead className="text-center font-semibold">Nom</TableHead>
              <TableHead className="text-center font-semibold">Type</TableHead>
              <TableHead className="text-center font-semibold">Prix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.length > 0 ? (
              rooms.map((room) => {
                const images = getImageUrl(room);
                return (
                  <TableRow
                    onClick={() => handleUpdate(room.$id)}
                    key={room.$id}
                    className="text-center cursor-pointer hover:bg-gray-100 transition-all"
                  >
                    <TableCell className="flex items-center justify-center">
                      <Image
                        src={images[0]}
                        alt="room"
                        width={100}
                        height={100}
                        className="shadow-md shadow-black h-auto"
                      />
                    </TableCell>
                    <TableCell className="font-semibold">
                      {room.title}
                    </TableCell>
                    <TableCell>{room.type}</TableCell>
                    <TableCell className="text-center">{room.price}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow className="text-center">
                <TableCell className="flex items-center justify-center">
                  Aucune chambre trouvée
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="w-full flex items-center justify-center my-4">
          <Button
            onClick={handleAddRoom}
            className="hover:text-white mt-4 py-6 px-3 transition-all"
          >
            Ajouter une chambre
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdminRooms;
