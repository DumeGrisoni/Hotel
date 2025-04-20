'use server';
import { createAdminClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

const createSession = async (previousState: unknown, formData: FormData) => {
  //--------------- Variables -----------------

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const { account } = await createAdminClient();

  //--------------- Fonctions-----------------

  if (!email || !password) {
    return {
      error: `Veuillez remplir tous les champs`,
    };
  } else {
    try {
      // CREATE SESSION
      const session = await account.createEmailPasswordSession(email, password);

      // CREATE COOKIES
      const cookiesData = await cookies();

      cookiesData.set('appwrite-session', session.secret, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(session.expire),
        path: '/',
      });

      return { succes: true };
    } catch (error) {
      console.log(`Erreur lors de la connexion`, error);
      return {
        error: `Identifiants incorrects`,
      };
    }
  }
};

export default createSession;
