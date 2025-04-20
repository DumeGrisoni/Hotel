import React from 'react';

// ------------------ Import Internes ----------------------------

import checkAuth from '@/app/actions/checkAuth';
import UserBookings from '@/components/user/UserBookings';
import { getBookingsByUserId } from '@/app/actions/bookingCrud';

const Profil = async () => {
  const { user } = await checkAuth();

  if (!user) {
    return <p>Chargement...</p>;
  }
  const userBookings = await getBookingsByUserId(user.id);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-12 gap-6">
      <h1 className="text-2xl md:text-4xl">{user.name}</h1>
      <p>{user.email}</p>
      <section className="flex flex-col w-[90%] mx-auto items-center mt-3 justify-center gap-3">
        {userBookings.length === 0 ? (
          <p>Aucune reservation</p>
        ) : (
          <UserBookings user={user} bookings={userBookings} />
        )}
      </section>
    </main>
  );
};

export default Profil;
