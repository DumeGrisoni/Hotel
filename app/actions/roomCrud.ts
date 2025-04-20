'use server';

import { createAdminClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';
import { ID, Query } from 'node-appwrite';

// ---------------------- Import Internes ----------------------------------

import { Room } from '@/types/roomsTypes';
import checkAuth from './checkAuth';

const databaseID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string;
const roomCollectionID = process.env
  .NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS as string;
const bucketID = process.env
  .NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS as string;

export async function getAllRooms() {
  try {
    const { databases } = await createAdminClient();

    //Fetch all rooms from the database
    const { documents: roomsData } = await databases.listDocuments(
      databaseID,
      roomCollectionID
    );

    return roomsData as Room[];
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la récupération des chambres',
      error
    );
    // Redirect to the home page in case of error
    redirect('/error');
  }
}

export async function getOneRoom(id: string) {
  try {
    const { databases } = await createAdminClient();
    const room = await databases.getDocument(databaseID, roomCollectionID, id);
    return room as Room;
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la récupération de la chambre',
      error
    );
    // Redirect to the home page in case of error
    redirect('/room');
  }
}

export const createRoom = async (
  previousState: unknown,
  formData: FormData
) => {
  // GET DATABASE INSTANCE
  const { databases, storage } = await createAdminClient();

  try {
    // GET USER ID
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'Veuillez vous connecter pour créer une chambre',
      };
    }

    // UPLOADING IMAGE
    let imageId;
    let secondImageId;
    let thirdImageId;

    const mainImage = formData.get('mainImage') as File | null;
    const secondImage = formData.get('secondImage') as File | null;
    const thirdImage = formData.get('thirdImage') as File | null;

    if (
      mainImage &&
      mainImage.size &&
      mainImage.name !== 'undefined' &&
      secondImage &&
      secondImage.size &&
      secondImage.name !== 'undefined' &&
      thirdImage &&
      thirdImage.size &&
      thirdImage.name !== 'undefined'
    ) {
      try {
        // Upload
        const response = await storage.createFile(
          'rooms',
          ID.unique(),
          mainImage
        );

        imageId = response.$id;
      } catch (error) {
        console.log(error);
        return {
          error:
            "Une erreur est survenue lors de l'upload de l'image principale",
        };
      }

      try {
        const secondResponse = await storage.createFile(
          'rooms',
          ID.unique(),
          secondImage
        );

        secondImageId = secondResponse.$id;
      } catch (error) {
        console.log(error);
        return {
          error: "Une erreur est survenue lors de l'upload de l'image seconde",
        };
      }

      try {
        const thirdResponse = await storage.createFile(
          'rooms',
          ID.unique(),
          thirdImage
        );
        thirdImageId = thirdResponse.$id;
      } catch (error) {
        console.log(error);
        return {
          error:
            "Une erreur est survenue lors de l'upload de l'image troisieme",
        };
      }
    } else {
      console.log('No image uploaded');
    }

    // CREATE ROOM
    const roomId = ID.unique();
    await databases.createDocument(databaseID, roomCollectionID, roomId, {
      title: formData.get('title') as string,
      type: formData.get('type') as string,
      capacity: parseInt(formData.get('capacity') as string, 10) || 0,
      price: parseInt(formData.get('price') as string, 10) || 0,
      size: parseInt(formData.get('size') as string, 10) || 0,
      description: formData.get('description') as string,
      rating: parseInt(formData.get('rating') as string, 10) || 0,
      mainImage: imageId,
      secondImage: secondImageId,
      thirdImage: thirdImageId,
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

export const updateRoom = async (
  previousState: unknown,
  formData: FormData
) => {
  // GET DATABASE INSTANCE
  const { databases, storage } = await createAdminClient();
  try {
    const id = formData.get('id') as string;

    const roomToUpdate = await databases.getDocument(
      databaseID,
      roomCollectionID,
      id
    );

    // // FIND ROOM TO UPDATE
    // const roomToUpdate = rooms.find((room) => room.$id === id);

    if (!roomToUpdate) {
      console.log('Aucune chambre trouvée');
      return null;
    }

    // GET USER ID
    const { user } = await checkAuth();

    if (!user || !user.labels.includes('admin')) {
      return {
        error: 'Veuillez vous connecter pour modifier une chambre',
      };
    }

    // UPDATE IMAGES
    let mainImageId;
    let secondImageId;
    let thirdImageId;

    const mainImage = formData.get('mainImage') as File | null;
    const secondImage = formData.get('secondImage') as File | null;
    const thirdImage = formData.get('thirdImage') as File | null;

    if (mainImage !== null) {
      try {
        const oldMainImage = await storage.getFile(
          bucketID,
          roomToUpdate.mainImage
        );

        // MODIFY IMAGE

        await storage.deleteFile(bucketID, oldMainImage.$id);

        const adding = await storage.createFile(
          'rooms',
          ID.unique(),
          mainImage
        );

        mainImageId = adding.$id;
      } catch (error) {
        console.log(
          'Une erreur est survenue lors de la modification de la main Image',
          error
        );
        return {
          error:
            'Une erreur est survenue lors de la modification de la main Image',
        };
      }
    } else {
      mainImageId = roomToUpdate.mainImage as string;
    }

    if (secondImage !== null) {
      try {
        const oldSecondImage = await storage.getFile(
          bucketID,
          roomToUpdate.secondImage
        );

        // MODIFY IMAGE

        await storage.deleteFile(bucketID, oldSecondImage.$id);

        const adding = await storage.createFile(
          'rooms',
          ID.unique(),
          secondImage
        );

        secondImageId = adding.$id;
      } catch (error) {
        console.log(
          'Une erreur est survenue lors de la modification de la 2e Image',
          error
        );
        return {
          error:
            'Une erreur est survenue lors de la modification de la 2e Image',
        };
      }
    } else {
      secondImageId = roomToUpdate.secondImage as string;
    }

    if (thirdImage !== null) {
      try {
        const oldThirdImage = await storage.getFile(
          bucketID,
          roomToUpdate.thirdImage
        );

        // MODIFY IMAGE

        await storage.deleteFile(bucketID, oldThirdImage.$id);

        const adding = await storage.createFile(
          'rooms',
          ID.unique(),
          thirdImage
        );

        thirdImageId = adding.$id;
      } catch (error) {
        console.log(
          'Une erreur est survenue lors de la modification de la 3eme Image',
          error
        );
        return {
          error:
            'Une erreur est survenue lors de la modification de la 3eme Image',
        };
      }
    } else {
      secondImageId = roomToUpdate.secondImage as string;
    }

    // UPDATE ROOM

    await databases.updateDocument(
      databaseID,
      roomCollectionID,
      roomToUpdate.$id,
      {
        title: formData.get('title') as string,
        type: formData.get('type') as string,
        capacity: parseInt(formData.get('capacity') as string),
        price: parseInt(formData.get('price') as string),
        size: parseInt(formData.get('size') as string),
        description: formData.get('description') as string,
        rating: parseInt(formData.get('rating') as string),
        mainImage: mainImageId,
        secondImage: secondImageId,
        thirdImage: thirdImageId,
      }
    );

    return { success: true };
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la modification de la chambre',
      error
    );
    return {
      error: 'Une erreur est survenue lors de la modification de la chambre',
    };
  }
};

export async function deleteRoom(id: string) {
  try {
    const { databases } = await createAdminClient();
    const { documents: rooms } = await databases.listDocuments(
      databaseID,
      roomCollectionID,
      [Query.equal('$id', id)]
    );

    // FIND ROOM TO DELETE
    const roomToDelete = rooms.find((room) => room.$id === id);

    if (!roomToDelete) {
      console.log('Aucune chambre trouvée');
      return null;
    }

    // DELETE ROOM
    await databases.deleteDocument(databaseID, roomCollectionID, id);

    // DELETE IMAGE
    const { storage } = await createAdminClient();
    if (roomToDelete.mainImage) {
      await storage.deleteFile(bucketID, roomToDelete.mainImage);
    }
    if (roomToDelete.secondImage) {
      await storage.deleteFile(bucketID, roomToDelete.secondImage);
    }
    if (roomToDelete.thirdImage) {
      await storage.deleteFile(bucketID, roomToDelete.thirdImage);
    }
    return { success: true };
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la suppression de la chambre',
      error
    );
    // Redirect to the home page in case of error
    redirect('/profil/admin');
  }
}
