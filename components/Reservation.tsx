'use client';

import React, { useState, useEffect, useActionState } from 'react';
import { format, isPast } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { Calendar as CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// -------------------------- Import Internes ----------------------------------------
import { Calendar } from './ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { cn } from '@/lib/utils';
import AlertMessage from './AlertMessage';
import { Button } from './ui/button';
import { Room } from '@/types/roomsTypes';
import { Booking } from '@/types/bookingType';
import { useAuth } from '@/app/context/authContext';
import { createBooking } from '@/app/actions/bookingCrud';
import { toast } from 'react-toastify';

const Reservation = ({
  room,
  bookings,
}: {
  room: Room;
  bookings: Booking[];
}) => {
  // -------------------------- State ----------------------------------------

  const [enterDate, setEnterDate] = useState<Date>();
  const [exitDate, setExitDate] = useState<Date>();
  const [wrongDate, setWrongDate] = useState<boolean>(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [price, setPrice] = useState(0);
  const [alertMessage, setAlertMessage] = useState<{
    message: string;
    type: 'error' | 'success' | null;
  } | null>(null);

  // -------------------------- Hooks ----------------------------------------

  const router = useRouter();
  const { isUserAuthenticated } = useAuth();
  const [data, action, isPending] = useActionState(createBooking, undefined);

  // -------------------------- Fonctions ----------------------------------------

  // GET BOOKED DAYS FOR THIS ROOM
  const getBookedDays = (bookings: Booking[], roomId: string) => {
    const bookedDates: Date[] = [];
    bookings.forEach((booking) => {
      if (booking.room.documentId === roomId) {
        const startDate = new Date(booking.checkIn).setHours(0, 0, 0, 0);
        const endDate = new Date(booking.checkOut).setHours(0, 0, 0, 0);
        for (
          let date = startDate;
          date <= endDate;
          date = new Date(date).setDate(new Date(date).getDate() + 1)
        ) {
          bookedDates.push(new Date(date));
        }
      }
    });
    return bookedDates;
  };

  // GET UNAVAILABLE START DATES
  const unavailableStartDates = (day: Date) =>
    isPast(day) ||
    bookedDates.some((bookedDate) => {
      const bookedDateTime = bookedDate.setHours(0, 0, 0, 0);
      return bookedDateTime === day.setHours(0, 0, 0, 0);
    });

  // GET UNAVAILABLE END DATES
  const unavailableEndDates = (day: Date) =>
    isPast(day) ||
    (enterDate !== undefined && day <= enterDate) ||
    bookedDates.some((bookedDate) => {
      const bookedDateTime = bookedDate.setHours(0, 0, 0, 0);
      return bookedDateTime === day.setHours(0, 0, 0, 0);
    });

  //--------------------------- UseEffect ----------------------------------------

  // SET WRONG DATES
  useEffect(() => {
    if (exitDate && enterDate && exitDate < enterDate) {
      setWrongDate(true);
    } else {
      setWrongDate(false);
    }
  }, [exitDate, enterDate]);

  // SET TIMEOUT FOR ALERT MESSAGE
  useEffect(() => {
    const timer = setTimeout(() => {
      return setAlertMessage(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [alertMessage]);

  // FILTER BOOKED DATES FOR THIS ROOM
  useEffect(() => {
    const bookedDays = getBookedDays(bookings, room.documentId);
    setBookedDates(bookedDays);
  }, [bookings, room.documentId]);

  // SEND ERROR AND SUCCESS
  useEffect(() => {
    if (data) {
      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        toast.success('Réservation réussie', { autoClose: 2000 });
        router.push('/room');
      }
    }
  }, [data, router]);

  // CALCULATE PRICE
  useEffect(() => {
    if (enterDate && exitDate && room) {
      const newPrice =
        room.price *
        Math.ceil(
          (exitDate.getTime() - enterDate.getTime()) / (1000 * 3600 * 24)
        );
      setPrice(newPrice);
    }
  }, [enterDate, exitDate, room]);

  //--------------------------- Render ----------------------------------------

  return (
    <section>
      <div className="bg-tertiary min-h-[320px] mb-4">
        <form action={action}>
          {/* Top */}
          <div className="bg-accent py-4 text-center relative mb-2">
            <h4 className="text-xl !text-white">Choisissez vos dates</h4>
            {/* Triangle */}
            <div className="absolute -bottom-[8px] left-[calc(50%_-_10px)] w-0 h0 border-l-[10px] border-l-transparent border-t-[8px] border-t-accent border-r-[10px] border-r-transparent " />
          </div>
          <div className="flex mt-4 flex-col gap-4 w-full py-6 px-8">
            {wrongDate && (
              <p className="text-accent text-lg font-medium">
                La date de sortie doit être postérieure à la date d&apos;entrée
              </p>
            )}
            {/* CheckIn */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="default"
                  size="default"
                  className={cn(
                    'w-full flex p-6 cursor-pointer justify-start text-left bg-white font-semibold hover:bg-white',
                    !enterDate && 'text-secondary'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {enterDate ? (
                    format(enterDate, 'PPP', { locale: fr }).replace(
                      /\b\w/g,
                      (match) => match.toUpperCase()
                    )
                  ) : (
                    <span>Date d&apos;arrivée</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  locale={fr}
                  mode="single"
                  selected={enterDate}
                  onSelect={(day) => setEnterDate(day)}
                  initialFocus
                  className="bg-white rounded-md capitalize"
                  disabled={unavailableStartDates}
                  required
                />
              </PopoverContent>
            </Popover>
            {/* CheckOut */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="default"
                  size={'default'}
                  className={cn(
                    'w-full flex p-6 cursor-pointer justify-start text-left bg-white font-semibold hover:bg-white',
                    !exitDate && 'text-secondary'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {exitDate ? (
                    format(exitDate, 'PPP', { locale: fr }).replace(
                      /\b\w/g,
                      (match) => match.toUpperCase()
                    )
                  ) : (
                    <span>Date de sortie</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  locale={fr}
                  mode="single"
                  selected={exitDate}
                  onSelect={(day) => setExitDate(day)}
                  initialFocus
                  className="bg-white rounded-md capitalize"
                  disabled={unavailableEndDates}
                />
              </PopoverContent>
            </Popover>

            <input
              className="hidden"
              readOnly
              type="date"
              id="checkIn"
              name="checkIn"
              value={
                enterDate !== undefined ? format(enterDate, 'yyyy-MM-dd') : ''
              }
            />
            <input
              readOnly
              className="hidden"
              type="date"
              id="checkOut"
              name="checkOut"
              value={
                exitDate !== undefined ? format(exitDate, 'yyyy-MM-dd') : ''
              }
            />
            <input
              type="text"
              className="hidden"
              id="roomId"
              name="roomId"
              readOnly
              value={room.$id}
            />
            <input
              type="number"
              className="hidden"
              id="price"
              name="price"
              readOnly
              value={price !== 0 ? price : 0}
            />

            {enterDate && exitDate && (
              <div className="my-3 mx-auto w-full flex flex-col gap-3 text-left">
                <p className="text-primary font-medium ">
                  Vous avez choisi de séjourner :
                </p>
                <p className="text-secondary font-medium">
                  •{' '}
                  {Math.ceil(
                    (exitDate.getTime() - enterDate.getTime()) /
                      (1000 * 3600 * 24)
                  )}{' '}
                  nuits dans la chambre {room.title}
                </p>
                <p className="text-secondary font-medium">
                  • Du{' '}
                  {format(enterDate, 'PPP', { locale: fr }).replace(
                    /\b\w/g,
                    (match) => match.toUpperCase()
                  )}{' '}
                  au{' '}
                  {format(exitDate, 'PPP', { locale: fr }).replace(
                    /\b\w/g,
                    (match) => match.toUpperCase()
                  )}
                </p>
                <p>
                  • Prix total :{' '}
                  <span className="text-accent font-semibold ">
                    {room.price *
                      Math.ceil(
                        (exitDate.getTime() - enterDate.getTime()) /
                          (1000 * 3600 * 24)
                      )}
                    €
                  </span>
                </p>
              </div>
            )}

            {/* Conditional render of booking based on user auth */}
            {isUserAuthenticated ? (
              <Button
                className="w-full py-6 hover:text-white cursor-pointer"
                size="default"
                type="submit"
                disabled={isPending}
              >
                RESERVER
              </Button>
            ) : (
              <div className="flex w-full justify-center items-center flex-col gap-2">
                <p className=" text-accent text-left lg:text-center text-base w-full font-medium">
                  Veuillez vous connecter pour réserver
                </p>

                <Link href="/login">
                  <Button
                    className="w-full h-12 hover:text-white cursor-pointer"
                    size="default"
                  >
                    Connexion
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </form>
      </div>

      {alertMessage && (
        <AlertMessage
          message={alertMessage.message}
          type={alertMessage.type !== null ? alertMessage.type : 'success'}
        />
      )}
    </section>
  );
};

export default Reservation;
