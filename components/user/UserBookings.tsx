import React from 'react';

// --------------- Import Internes ------------------------------
import { Booking } from '@/types/bookingType';
import { User } from '@/types/userType';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

const UserBookings = ({
  user,
  bookings,
}: {
  user: User;
  bookings: Booking[];
}) => {
  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="flex w-full flex-col gap-6 items-center justify-center">
      <Table className="w-full">
        <TableHeader className="bg-accent  text-white">
          <TableRow>
            <TableHead className="text-left md:text-center font-semibold">
              Chambre
            </TableHead>
            <TableHead className="text-center font-semibold">
              Date d&apos;arrivée
            </TableHead>
            <TableHead className="text-center font-semibold">
              Date de départ
            </TableHead>
            <TableHead className="text-right md:text-center font-semibold">
              Prix
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <TableRow key={booking.$id} className="text-center">
                <TableCell className="font-medium text-left md:text-center">
                  {booking.room.title}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {format(booking.checkIn, 'dd/MM/yyyy')}
                </TableCell>
                <TableCell className="font-medium text-center">
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
  );
};

export default UserBookings;
