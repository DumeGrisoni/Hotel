'use client';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { FaSearch } from 'react-icons/fa';

// --------------- Import Internes ------------------------------
import { getAllBookings } from '@/app/actions/bookingCrud';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Booking } from '@/types/bookingType';
import { useRouter } from 'next/navigation';

const AdminBookings = () => {
  // -------------------- Hooks -------------------------------
  const [bookings, setBookings] = useState<Booking[]>();
  const [initialBookings, setInitialBookings] = useState<Booking[]>();
  const router = useRouter();

  // -------------------- Fonctions -------------------------------
  const handleUpdate = (id: string) => {
    router.push(`/profil/admin/bookings/${id}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    if (searchValue === '') {
      setBookings(initialBookings); // réinitialise la liste des bookings à son état initial
    } else {
      const filteredBookings = bookings?.filter(
        (booking) =>
          booking.room.title
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          booking.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setBookings(filteredBookings);
    }
  };

  // -------------------- useEffect -------------------------------
  useEffect(() => {
    const getBookings = async () => {
      const bookingsData = await getAllBookings();
      setBookings(bookingsData);
      setInitialBookings(bookingsData);
    };
    getBookings();
  }, []);

  // -------------------- Return -------------------------------

  if (!bookings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h3>...Loading</h3>
      </div>
    );
  }

  return (
    <section className="md:w-[80%] lg:w-[70%] xl:w-[50%] w-[95%] mx-auto flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full relative mx-auto ">
          <FaSearch className="absolute top-3 right-2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une chambre ou un client"
            className="border border-gray-300 mb-6 bg-white focus:outline-none w-full py-2 px-3"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <Table className="w-full">
          <TableHeader className="bg-accent  text-white">
            <TableRow>
              <TableHead className="text-left md:text-center font-semibold">
                Chambre
              </TableHead>
              <TableHead className="text-center font-semibold">
                Client
              </TableHead>
              <TableHead className="text-center font-semibold">Dates</TableHead>
              <TableHead className="text-right md:text-center font-semibold">
                Prix
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <TableRow
                  key={booking.$id}
                  className="text-center cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => handleUpdate(booking.$id)}
                >
                  <TableCell className="font-medium text-left md:text-center">
                    {booking.room.title}
                  </TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell className="flex flex-col items-center justify-center md:flex-row">
                    <span>{format(booking.checkIn, 'dd/MM/yyyy')}</span>
                    {format(booking.checkOut, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell className="text-right md:text-center">
                    {booking.price}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="">
                <TableCell className="text-left">
                  Aucune réservations trouvée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default AdminBookings;
