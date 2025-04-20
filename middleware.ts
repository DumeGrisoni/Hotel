import { NextResponse, NextRequest } from 'next/server';
import checkAuth from './app/actions/checkAuth';

export const middleware = async (request: NextRequest) => {
  const { isAuthenticated, user } = await checkAuth();

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const isAdmin = user?.labels.includes('admin'); // Vérifie si l'utilisateur a le label 'admin'

  if (request.nextUrl.pathname.startsWith('/profil/admin') && !isAdmin) {
    return NextResponse.redirect(new URL('/profil/user', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/profil',
    '/profil/admin',
    '/profil/admin/room/add',
    '/profil/admin/room/:id',
  ],
};
