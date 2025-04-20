import React from 'react';
import { TbArrowsMaximize, TbUsers } from 'react-icons/tb';

// --------------------- Import Internes -----------------------------

import { getOneRoom } from '@/app/actions/roomCrud';
import Reservation from '@/components/Reservation';
import ImageSelector from '@/components/ImageSelector';
import { getAllBookings } from '@/app/actions/bookingCrud';

const RoomDetails = async ({ params }: { params: { id: string } }) => {
  // --------------------- Hooks -----------------------------

  const { id } = await params;

  // --------------------- Fonctions -----------------------------

  const getRoomData = async () => {
    const res = await getOneRoom(id as string);
    return res;
  };

  const getBookings = async () => {
    const res = await getAllBookings();

    return res;
  };

  // --------------------- Variables -----------------------------
  const room = await getRoomData();
  const bookings = await getBookings();

  // ---------------------- Conditionnal Return -----------------------------

  if (!room || !bookings) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // --------------------- Return -----------------------------

  return (
    <section className="min-h-[80vh]">
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row lg:gap-12 h-full">
          {/* Image & Text */}
          <div className="flex-1 px-6">
            <ImageSelector room={room} />
            <div className="mt-2 flex justify-between items-center mb-4">
              <h3 className="h3">{room.title}</h3>
              <p className="h3 font-secondary font-medium text-accent">
                {room.price}€
                <span className="text-base text-secondary">/nuit</span>
              </p>
            </div>
            {/* infos */}
            <div className="flex items-center gap-8 mb-4">
              <div className="flex items-center gap-2">
                <div className="text-2xl text-accent">
                  <TbArrowsMaximize />
                </div>
                <p>
                  {room.size} m<sup>2</sup>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-2xl text-accent">
                  <TbUsers />
                </div>
                <p>
                  {room.capacity} {room.capacity > 1 ? 'personnes' : 'personne'}
                </p>
              </div>
            </div>
            <p className="justify mb-4">{room.description}</p>
          </div>
          {/* Reservations */}
          <div className="w-full px-6 lg:max-w-[360px] h-max">
            <Reservation bookings={bookings} room={room} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
