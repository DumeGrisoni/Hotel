'use server';
import React from 'react';
// import { redirect } from 'next/navigation';

// import checkAuth from '@/app/actions/checkAuth';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  //   const { user } = await checkAuth();

  //   if (!user || !user.labels.includes('admin')) {
  //     return redirect('/profil/user');
  //   }
  return <div>{children}</div>;
};

export default AdminLayout;
