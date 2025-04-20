'use server';

import { createAdminClient, createSessionClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';

// ---------------------- Import Internes ----------------------------------
import { Menu } from '@/types/menuType';
import { ID, Query } from 'node-appwrite';
import checkAuth from './checkAuth';
import { cookies } from 'next/headers';

const databaseID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string;
const menuCollectionID = process.env
  .NEXT_PUBLIC_APPWRITE_COLLECTION_MENU as string;

export async function getAllMenus() {
  try {
    const { databases } = await createAdminClient();

    // GET ALL MENUS FROM APPWRITE DATABASE
    const { documents: menuData } = await databases.listDocuments(
      databaseID,
      menuCollectionID
    );

    return menuData as Menu[];
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la récupération des menus',
      error
    );
    // REDIRECT TO ERROR PAGE IN CASE OF ERROR
    redirect('/error');
  }
}

export async function updateMenu(previousState: unknown, formData: FormData) {
  // GET DATABASE INSTANCE
  const sessionCookie = await cookies();
  const cookie = sessionCookie.get('appwrite-session');

  if (!cookie) {
    redirect('/login');
  }

  const id = formData.get('id') as string;
  const price = parseInt(formData.get('price') as string, 10);
  const title = formData.get('title') as string;
  const dishes = Array.from(formData.getAll('dishes')).map(
    (value) => value as string
  );
  const descriptions = Array.from(formData.getAll('descriptions')).map(
    (value) => value as string
  );

  if (!title || !dishes || !price || !descriptions) {
    return { error: 'Veuillez remplir tous les champs' };
  }

  try {
    const { databases } = await createSessionClient(cookie.value);
    // GET USER ID
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'Veuillez vous connecter pour modifier un menu',
      };
    }

    await databases.updateDocument(databaseID, menuCollectionID, id, {
      title,
      price,
      dishes,
      descriptions,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la mise à jour du menu',
      error
    );
  }
}

export async function getOneMenu(id: string) {
  try {
    const { databases } = await createAdminClient();
    const menu = await databases.getDocument(databaseID, menuCollectionID, id);
    return menu as Menu;
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la récupération du menu',
      error
    );
    // Redirect to the home page in case of error
    redirect('/restaurant');
  }
}

export const createMenu = async (
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
  const title = formData.get('title') as string;
  const dishes = Array.from(formData.getAll('dishes')).map(
    (value) => value as string
  );
  const descriptions = Array.from(formData.getAll('descriptions')).map(
    (value) => value as string
  );
  console.log(title, dishes, price, descriptions);

  if (!title || !dishes || !price) {
    return { error: 'Veuillez remplir tous les champs' };
  }

  try {
    const { databases } = await createSessionClient(cookie.value);
    // GET USER ID
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'Veuillez vous connecter pour créer un menu',
      };
    }

    // CREATE MENU
    const menuIdUnique = ID.unique();
    await databases.createDocument(databaseID, menuCollectionID, menuIdUnique, {
      title: title,
      dishes: dishes,
      price: price,
      descriptions: descriptions,
    });

    return { success: true };
  } catch (error) {
    console.log('Une erreur est survenue lors de la création du menu', error);
    return {
      error: 'Une erreur est survenue lors de la création du menu',
    };
  }
};

export async function deleteMenu(id: string) {
  try {
    const { databases } = await createAdminClient();
    const { documents: menu } = await databases.listDocuments(
      databaseID,
      menuCollectionID,
      [Query.equal('$id', id)]
    );

    // FIND MENU TO DELETE
    const menugToDelete = menu.find((m) => m.$id === id);

    if (!menugToDelete) {
      console.log('Aucun menu trouvé');
      return null;
    }

    // DELETE MENU
    await databases.deleteDocument(databaseID, menuCollectionID, id);
    return { success: true };
  } catch (error) {
    console.log(
      'Une erreur est survenue lors de la suppression du menu',
      error
    );
    // Redirect to the home page in case of error
    redirect('/profil/admin');
  }
}
