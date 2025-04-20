'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ------------------ Import Internes ------------------------
import { useAuth } from '../context/authContext';

const Profil = () => {
  // ------------------ Hooks ------------------------
  const router = useRouter();
  const { isUserAuthenticated, user } = useAuth();

  // ------------------ useEffect ------------------------
  useEffect(() => {
    if (!isUserAuthenticated) {
      return router.push('/login');
    }
    if (user && user.labels.includes('admin')) {
      return router.push('profil/admin');
    } else {
      return router.push('/profil/user');
    }
  }, [isUserAuthenticated, user, router]);
};

export default Profil;
