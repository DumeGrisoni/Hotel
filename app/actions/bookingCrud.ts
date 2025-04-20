'use server';

import { createAdminClient, createSessionClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';

// ---------------------- Import Internes ----------------------------------
import { Booking } from '@/types/bookingType';
import { ID, Query } from 'node-appwrite';
import checkAuth from './checkAuth';
import { cookies } from 'next/headers';

const databaseID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string;
const bookingCollectionID = process.env
  .NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS as string;

export async function getAllBookings() {
  try {
    const { databases } = await createAdminClient();

    // GET ALL BOOKINGS FROM APPWRITE DATABASE
    const { documents: bookingsData } = await databases.listDocuments(
      databaseID,
      bookingCollectionID
    );

    return bookingsData as Booking[];
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la récupération des reservations',
      error
    );
    // REDIRECT TO ERROR PAGE IN CASE OF ERROR
    redirect('/error');
  }
}

export async function getBookingsByUserId(userId: string) {
  try {
    const { databases } = await createAdminClient();

    // GET ALL BOOKINGS FROM APPWRITE DATABASE
    const { documents: bookingsData } = await databases.listDocuments(
      databaseID,
      bookingCollectionID,
      [Query.equal('user_id', userId)]
    );

    return bookingsData as Booking[];
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la récupération des reservations',
      error
    );
    // REDIRECT TO ERROR PAGE IN CASE OF ERROR
    redirect('/error');
  }
}

export async function getOneBooking(id: string) {
  try {
    const { databases } = await createAdminClient();
    const booking = await databases.getDocument(
      databaseID,
      bookingCollectionID,
      id
    );
    return booking as Booking;
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la récupération de la reservation',
      error
    );
    // Redirect to the home page in case of error
    redirect('/room');
  }
}

export const createBooking = async (
  previousState: unknown,
  formData: FormData
) => {
  // GET DATABASE INSTANCE
  const sessionCookie = await cookies();
  const cookie = sessionCookie.get('appwrite-session');

  if (!cookie) {
    redirect('/login');
  }

  const price = parseInt(formData.get('price') as string, 10);
  const enterDate = formData.get('checkIn') as string;
  const exitDate = formData.get('checkOut') as string;

  if (!enterDate || !exitDate || !price) {
    return { error: 'Veuillez remplir tous les champs' };
  }

  try {
    const { databases } = await createSessionClient(cookie.value);
    // GET USER ID
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'Veuillez vous connecter pour créer une chambre',
      };
    }

    // GET ROOM
    const roomId = formData.get('roomId') as string;

    // const room = await getOneRoom(roomId);

    if (!roomId) {
      return { error: 'Aucun chambre trouvée' };
    }

    // CREATE Booking
    const bookingId = ID.unique();
    await databases.createDocument(databaseID, bookingCollectionID, bookingId, {
      name: user.name,
      email: user.email,
      user_id: user.id,
      price: price,
      checkIn: enterDate,
      checkOut: exitDate,
      room: roomId,
    });

    return { success: true };
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la création de la chambre',
      error
    );
    return {
      error: 'Une erreur est survenue lors de la création de la chambre',
    };
  }
};

export async function deleteBooking(id: string) {
  try {
    const { databases } = await createAdminClient();
    const { documents: bookings } = await databases.listDocuments(
      databaseID,
      bookingCollectionID,
      [Query.equal('$id', id)]
    );

    // FIND BOOKING TO DELETE
    const bookingToDelete = bookings.find((booking) => booking.$id === id);

    if (!bookingToDelete) {
      console.log('Aucune reservation trouvée');
      return null;
    }

    // DELETE ROOM
    await databases.deleteDocument(databaseID, bookingCollectionID, id);
    return { success: true };
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la suppression de la réservation',
      error
    );
    // Redirect to the home page in case of error
    redirect('/profil/admin');
  }
}
