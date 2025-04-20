'use client';
import React from 'react';
import { AuthContextProvider } from '@/app/context/authContext';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default AuthWrapper;
