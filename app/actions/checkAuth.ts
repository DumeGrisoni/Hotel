'use server';
import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

const checkAuth = async () => {
  const cookiesData = await cookies();
  const sessionCookie = cookiesData.get('appwrite-session')?.value as string;

  if (!sessionCookie) {
    return { isAuthenticated: false };
  } else {
    try {
      const { account } = await createSessionClient(sessionCookie);
      const user = await account.get();
      return {
        isAuthenticated: true,
        user: {
          id: user.$id,
          name: user.name,
          email: user.email,
          labels: user.labels,
        },
      };
    } catch (error) {
      console.log(error);
      return { isAuthenticated: false };
    }
  }
};
export default checkAuth;
