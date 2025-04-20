'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// --------------------- Import Internes -----------------------------

import { getOneBooking } from '@/app/actions/bookingCrud';
import AdminButton from '@/components/admin/AdminButton';
import { Booking } from '@/types/bookingType';
import { format, parseISO } from 'date-fns';

const BookingUpdate = () => {
  // --------------------- Hooks -----------------------------
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [booking, setBooking] = useState<Booking>();

  // --------------------- Fonctions -----------------------------
  const onDelete = () => {
    toast.success('Réservation supprimée');
    router.push('/profil/admin');
  };

  // --------------------- useEffect -----------------------------

  useEffect(() => {
    const getBookingData = async () => {
      const res = await getOneBooking(id as string);
      setBooking(res);
    };
    getBookingData();
  }, [id]);

  // ---------------------- Conditionnal Return -----------------------------

  if (!booking) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen flex flex-col mt-10 items-center justify-start">
      <div className="mb-6 bg-tertiary shadow-md w-[95%] md:w-[80%] lg:w-[70%] xl:w-[50%]">
        <div className="bg-accent py-4 text-center relative mb-2">
          <h3 className="text-[16px] md:text-[20px] lg:text-[24px] text-center bg-accent !text-white">
            Réservation pour <span> {booking.room.title} </span>
          </h3>
          <div className="absolute -bottom-[8px] left-[calc(50%_-_10px)] w-0 h0 border-l-[10px] border-l-transparent border-t-[8px] border-t-accent border-r-[10px] border-r-transparent " />
        </div>

        {/* CLIENT  */}
        <div className="p-6 md:max-w-[70%] md:mx-auto">
          <div className="flex flex-col  md:flex-row items-start md:items-center justify-center md:justify-between ">
            <div className="mb-4">
              <p className="text-primary font-semibold mb-2">Client</p>
              <p>{booking.name}</p>
            </div>
            <div className="mb-4">
              <p className="text-primary font-semibold mb-2 md:text-end">
                Email
              </p>
              <p>{booking.email}</p>
            </div>
          </div>

          {/* CHAMBRE & PRIX */}
          <div className="flex flex-col  md:flex-row items-start md:items-center justify-center md:justify-between ">
            <div className="mb-4">
              <p className="text-primary font-semibold mb-2 text-start">
                Chambre
              </p>
              <p>{booking.room.title}</p>
            </div>
            <div className="mb-4">
              <p className="text-primary font-semibold mb-2 md:text-end">
                Prix
              </p>
              <p>{booking.price} €</p>
            </div>
          </div>

          {/* DATE */}
          <div className="flex flex-col  md:flex-row items-start md:items-center justify-center md:justify-between ">
            <div className="mb-4">
              <p className="text-primary font-semibold mb-2 text-start">
                Entrée
              </p>
              <p>{format(parseISO(booking.checkIn), 'dd-MM-yyyy')}</p>
            </div>
            <div className="mb-4">
              <p className="text-primary font-semibold mb-2 md:text-end">
                Sortie
              </p>
              <p>{format(parseISO(booking.checkOut), 'dd-MM-yyyy')}</p>
            </div>
          </div>
        </div>

        <div className="flex p-2 items-center mb-4 justify-center flex-col md:flex-row gap-3">
          <AdminButton
            onUpdate={onDelete}
            type="delete"
            id={id}
            data={booking}
          />
        </div>
      </div>
    </section>
  );
};

export default BookingUpdate;
