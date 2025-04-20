'use server';
import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

const destroySession = async () => {
  //--------------- Fonctions-----------------

  const cookiesData = await cookies();
  const sessionCookie = cookiesData.get('appwrite-session')?.value as string;

  if (!sessionCookie) {
    return {
      error: `Aucune session active`,
    };
  } else {
    try {
      const { account } = await createSessionClient(sessionCookie);

      // DELETE SESSION
      await account.deleteSession('current');

      // DELETE COOKIES
      cookiesData.delete('appwrite-session');

      return { success: true };
    } catch (error) {
      console.log(`Erreur lors de la déconnexion`, error);
      return {
        error: `Erreur lors de la déconnexion`,
      };
    }
  }
};

export default destroySession;
