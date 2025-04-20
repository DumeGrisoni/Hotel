import type { Metadata } from 'next';
import { Marcellus, Urbanist } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ----------------------- Import Internes --------------------------------
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './globals.css';
import AuthWrapper from '@/components/AuthWrapper';

// ----------------------- Fonts & Variables -------------------------------
const marcellus = Marcellus({
  subsets: ['latin'],
  variable: '--font-marcellus',
  weight: ['400'],
});

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Hotel Demo',
  description: 'Site web pour un hotel, situé en Corse, réservations en ligne',
};

// ----------------------- Layout Return -----------------------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <html lang="fr">
        <body
          className={`${marcellus.variable} ${urbanist.variable} antialiased flex flex-col `}
        >
          <Header />
          {children}
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthWrapper>
  );
}
